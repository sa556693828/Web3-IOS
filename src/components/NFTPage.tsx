import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Spinner, Button, Text, Box} from '@gluestack-ui/themed';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import basic from '../abi/basic.json';
import axios from 'axios';
import {styled} from 'nativewind';
import HistoryModal from './HistoryModal';
import {Heart, ArchiveRestore} from 'lucide-react-native';
import Swiper from 'react-native-swiper';
import {MarketContext} from '../context/MarketProvider';
import useUser from '../hooks/useUser';
import useLoginAccount from '../hooks/useLoginAccount';
import useImage from '../hooks/useImage';

const NFTPage = () => {
  const {userVid} = useContext(MarketContext);
  const {getAccount, accountData} = useLoginAccount();
  const {getUser, data, success} = useUser();
  const {getImage, image} = useImage();

  const StyledBox = styled(Box);
  const StyledButton = styled(Button);
  const StyledSwiper = styled(Swiper);
  const StyledText = styled(Text);
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/rF-18JXiZ8TUtMsk0VUI1ppUq6gDzt9m',
  );
  const contract = new ethers.Contract(basic.address, basic.abi, provider);
  const [loading, setLoading] = useState(false);
  const [tokenURI, setTokenURI] = useState('');
  const [tokenID, setTokenID] = useState();
  const [showModal, setShowModal] = useState(false);

  const getTokenID = useCallback(
    async (address: string) => {
      try {
        if (!address) {
          throw new Error('No wallet address');
        }
        const balance = await contract.balanceOf(address);
        if (balance.toNumber() > 0) {
          const tokenID = await contract.tokenOfOwnerByIndex(address, 0);
          setTokenID(tokenID.toNumber());
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
      if (tokenURI) {
        setTokenURI(tokenURI);
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
  }, [data, success, data?.wallet_address]);

  const NFTSection = () => {
    if (loading) {
      return (
        <StyledBox className="flex justify-center items-center w-full h-[358px] bg-yellow-10 border border-white/20 rounded-lg">
          <Spinner />
        </StyledBox>
      );
    }
    return (
      <StyledBox className="flex justify-center items-center w-full h-[358px] bg-yellow-100 rounded-lg">
        <Text>{tokenURI}</Text>
      </StyledBox>
    );
  };
  return (
    <StyledBox className="flex h-full text-left pt-[120px] px-4 w-full space-y-10">
      <VStack gap="$6">
        <StyledBox className="flex flex-row justify-end items-center gap-6">
          <ArchiveRestore size={28} color="#fffff050" />
          <Heart size={28} color="#fffff050" />
        </StyledBox>
        {NFTSection()}
        <StyledBox className="flex flex-row justify-between items-center">
          <StyledText className="text-white/40 tracking-[1.28px] leading-[120%] font-normal">
            YOHAKU FOUNDER'S EDITION
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
