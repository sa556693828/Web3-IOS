import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, Image} from 'react-native';
import {VStack, Spinner, Button, Text, Box} from '@gluestack-ui/themed';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import basic from '../abi/basic.json';
import axios from 'axios';
import {styled} from 'nativewind';
import HistoryModal from './HistoryModal';
import {Heart, ArchiveRestore, RotateCcw} from 'lucide-react-native';
import Swiper from 'react-native-swiper';
import {MarketContext} from '../context/MarketProvider';
import useUser from '../hooks/useUser';
import useLoginAccount from '../hooks/useLoginAccount';
import useHistory from '../hooks/useHistory';
import useUtility from '../hooks/useUtility';
import {useStorage} from '../hooks/useStorge';
import useOrder from '../hooks/useOrder';

export interface NFTData {
  collection: any;
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: any;
  seller_fee_basis_points: number;
  fee_recipient: string;
}

export interface historyList {
  name: string;
  create_time: string;
  tokenURI?: string;
}

const NFTPage = () => {
  const userVID = useStorage('userVid');
  const [userVid, setUserVid] = userVID;
  const UserTOKEN = useStorage('userToken');
  const [userToken, setUserToken] = UserTOKEN;
  const {getHistory, historyList} = useHistory();
  const {getUtilities, data: utList} = useUtility();
  const {getAccount, accountData} = useLoginAccount();
  const {data: orderList, getUserOrders, success: orderSuccess} = useOrder();
  const {getUser, data, success} = useUser();
  const StyledBox = styled(Box);
  const StyledButton = styled(Button);
  const StyledSwiper = styled(Swiper);
  const StyledImage = styled(Image);
  const StyledText = styled(Text);
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/rF-18JXiZ8TUtMsk0VUI1ppUq6gDzt9m',
  );
  const contract = new ethers.Contract(basic.address, basic.abi, provider);
  const [loading, setLoading] = useState(false);
  const [NFTData, setNFTData] = useState<NFTData>({} as unknown as NFTData);
  const [tokenID, setTokenID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [index, setIndex] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [disBounce, setDisBounce] = useState(true);
  const [currentHistory, setCurrentHistory] = useState<historyList>({
    name: '',
    create_time: '',
    tokenURI: '',
  });
  const [history, setHistory] = useState<historyList[]>([
    {
      name: '',
      create_time: '',
      tokenURI: '',
    },
  ]);
  const getImage = async (uri: string) => {
    setLoading(true);
    try {
      const res = await axios.get(uri, {
        withCredentials: true,
        headers: {
          Cookie: `uvid=${userVid}; token=${userToken}`,
        },
      });
      setNFTData(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const getTokenID = useCallback(
    async (address: string) => {
      try {
        if (!address) {
          throw new Error('No wallet address');
        }
        const balance = await contract.balanceOf(address);
        if (balance.toNumber() > 0) {
          const tokenID = await contract.tokenOfOwnerByIndex(address, 0);
          return tokenID.toNumber();
        } else {
          throw new Error('Balance is zero');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [userVid],
  );
  const getNFTs = async (address: string) => {
    setLoading(true);
    try {
      const tokenID = await getTokenID(address);
      const tokenURI = await contract.tokenURI(tokenID);
      setTokenID(tokenID);
      // if (tokenURI) {
      //   await getImage(tokenURI);
      // }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const formatDateOne = (date: string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = new Date(date)
      .toLocaleDateString('ja-JP', {
        timeZone: userTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        // hour: 'numeric',
        // minute: 'numeric',
      })
      .replace(/\//g, '-');
    return `${formattedDate}`;
  };
  const transformHistory = async (list: any) => {
    setHistoryLoading(true);
    try {
      const transformedData = await list?.map((item: any) => {
        const utTitle = utList?.find(
          (ut: any) => ut?.view_id === item?.utility_vid,
        )?.title;
        const time = formatDateOne(item.create_time);
        return {
          name: utTitle ? utTitle : 'NFT Minting',
          create_time: time,
          tokenURI: `https://yohaku.soooul.xyz/api/nft/metadata/founder/${item.token_uri_id}`,
        };
      });
      setHistory(transformedData);
      setCurrentHistory(transformedData[transformedData.length - 1]);
      setIndex(transformedData.length - 1);
    } catch (error) {
      console.error(error);
    }
    setHistoryLoading(false);
  };
  const changeHistory = (index: number) => {
    setCurrentHistory(history[index]);
    setIndex(index);
    setShowModal(false);
  };

  //every 5 seconds getOrder
  useEffect(() => {
    if (disBounce) {
      const interval = setInterval(() => {
        getUserOrders('utility');
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [userVid, refreshing, disBounce]);

  useEffect(() => {
    getUser(userVid);
    getAccount(userVid);
    getHistory(userVid);
    getUtilities();
  }, [userVid, refreshing]);

  useEffect(() => {
    if (data && success && data?.wallet_address) {
      getNFTs(data.wallet_address);
    }
  }, [data, success, data?.wallet_address, refreshing]);
  useEffect(() => {
    if (orderSuccess) {
      try {
        const order = orderList?.find((order: any) => {
          if (order?.status === 10) {
            return true;
          } else {
            return false;
          }
        });
        setWaiting(order);
      } catch (error) {
        console.log(error);
      }
    }
  }, [orderList, orderSuccess]);

  useEffect(() => {
    if (historyList && utList && historyList.length > 0) {
      transformHistory(historyList);
    }
  }, [historyList, utList, refreshing]);

  useEffect(() => {
    if (currentHistory && currentHistory.tokenURI) {
      getImage(currentHistory.tokenURI);
    }
  }, [currentHistory, refreshing]);

  const NFTSection = () => {
    return (
      <StyledBox className="flex justify-center items-center w-full h-[358px] bg-yellow-10 border border-white/20 rounded-lg">
        {loading ? (
          <Spinner />
        ) : (
          NFTData.image && (
            <StyledImage
              className={`${
                waiting ? 'opacity-40' : ''
              } rounded-lg w-full h-full`}
              source={{
                uri: `${NFTData.image}`,
              }}
            />
          )
        )}
      </StyledBox>
    );
  };
  return (
    <StyledBox className="flex text-left h-full pt-[120px] px-4 w-full space-y-10">
      <VStack gap="$6">
        <StyledBox className="flex flex-row justify-end items-center gap-6">
          <StyledButton
            onPress={() => setRefreshing(!refreshing)}
            className="bg-transparent p-0">
            <RotateCcw size={28} color="#fffff050" />
          </StyledButton>
          <ArchiveRestore size={28} color="#fffff050" />
          <Heart size={28} color="#fffff050" />
        </StyledBox>
        {NFTSection()}
        <StyledBox className="flex flex-row justify-between items-center">
          <StyledText className="text-white/40 tracking-[1.28px] leading-[120%] font-normal max-w-xs">
            {NFTData.name}
          </StyledText>
          <StyledText className="text-white/40 tracking-[1.28px] leading-[120%] font-normal">
            #{tokenID}
          </StyledText>
        </StyledBox>
      </VStack>
      <StyledSwiper
        showsButtons={true}
        buttonWrapperStyle={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          top: 28,
          left: 0,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
        nextButton={
          <StyledButton
            className={`p-0 pr-4 bg-transparent w-14 flex justify-end ${
              index === history.length - 1 ? 'opacity-30' : ''
            }`}
            disabled={index === history.length - 1}
            onPress={
              index === history.length - 1
                ? () => {}
                : () => changeHistory(index + 1)
            }>
            <StyledText className="text-white text-5xl font-thin -ml-3">
              ›
            </StyledText>
          </StyledButton>
        }
        prevButton={
          <StyledButton
            className={`p-0 pl-4 bg-transparent w-14 flex justify-start  ${
              index === 0 ? 'opacity-30' : ''
            }`}
            disabled={index === 0}
            onPress={index === 0 ? () => {} : () => changeHistory(index - 1)}>
            <StyledText className="text-white text-5xl font-thin -ml-3">
              ‹
            </StyledText>
          </StyledButton>
        }>
        <StyledButton
          className="justify-center items-center flex flex-col bg-transparent"
          onPress={() => {
            setShowModal(true);
            setDisBounce(false);
          }}>
          {historyLoading ? (
            <Spinner color="$white" />
          ) : (
            <>
              <StyledText className="text-white uppercase tracking-[1.28px]">
                {currentHistory?.name}
              </StyledText>
              <StyledText className="text-white pt-2 uppercase text-white/40">
                {currentHistory?.create_time}
              </StyledText>
            </>
          )}
        </StyledButton>
      </StyledSwiper>

      <HistoryModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={history}
        changeData={changeHistory}
        setDisBounce={setDisBounce}
      />
    </StyledBox>
  );
};
export default NFTPage;
