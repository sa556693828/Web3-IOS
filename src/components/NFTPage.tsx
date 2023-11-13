import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  VStack,
  Spinner,
  Button,
  Text,
  Box,
  ScrollView,
} from '@gluestack-ui/themed';
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
import useImage from '../hooks/useImage';
import {Stream} from 'stream';
import {RefreshControl} from 'react-native';

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

const NFTPage = () => {
  const {userVid} = useContext(MarketContext);
  const {getAccount, accountData} = useLoginAccount();
  const {getUser, data, success} = useUser();
  const {getImage, image} = useImage();
  const StyledBox = styled(Box);
  const StyledScrollView = styled(ScrollView);
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
      console.log(tokenURI);
      setTokenID(tokenID);
      if (tokenURI) {
        const res = await axios.get(tokenURI);
        console.log('NFTData', res.data);
        setNFTData(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(userVid);
    getAccount(userVid);
  }, [userVid]);

  useEffect(() => {
    if (data && success && data?.wallet_address) {
      getNFTs(data.wallet_address);
    }
  }, [data, success, data?.wallet_address, refreshing]);

  const NFTSection = () => {
    return (
      <StyledBox className="flex justify-center items-center w-full h-[358px] bg-yellow-10 border border-white/20 rounded-lg">
        {loading ? (
          <Spinner />
        ) : (
          NFTData.image && (
            <StyledImage
              className="rounded-lg w-full h-full"
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
          <StyledText className="text-white text-5xl font-thin -mr-3">
            ›
          </StyledText>
        }
        prevButton={
          <StyledText className="text-white text-5xl font-thin -ml-3">
            ‹
          </StyledText>
        }>
        <StyledButton
          className="justify-center items-center flex flex-col bg-transparent"
          onPress={() => setShowModal(true)}>
          <StyledText className="text-white uppercase tracking-[1.28px]">
            Work shop
          </StyledText>
          <StyledText className="text-white pt-2 uppercase text-white/40">
            2023-11-10
          </StyledText>
        </StyledButton>
      </StyledSwiper>

      <HistoryModal showModal={showModal} setShowModal={setShowModal} />
    </StyledBox>
  );
};
const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
});
export default NFTPage;
