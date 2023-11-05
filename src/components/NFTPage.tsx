import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
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
import finalNFT from '../abi/finalNFT.json';
import axios from 'axios';
import {styled} from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import HistoryModal from './HistoryModal';
import {Heart, ArchiveRestore} from 'lucide-react-native';

const NFTPage = () => {
  const StyledBox = styled(Box);
  const StyledBg = styled(LinearGradient);
  const StyledText = styled(Text);
  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/rF-18JXiZ8TUtMsk0VUI1ppUq6gDzt9m',
  );
  const contract = new ethers.Contract(
    finalNFT.address,
    finalNFT.abi,
    provider,
  );
  const [loading, setLoading] = useState(false);
  const [tokenURI, setTokenURI] = useState('');
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  const getNFTs = async () => {
    setLoading(true);
    try {
      const tokenURI = await contract.tokenURI(0);
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
    getNFTs();
  }, []);
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
            #2
          </StyledText>
        </StyledBox>
      </VStack>
      <Button onPress={() => setShowModal(true)} ref={ref}>
        <Text>Show Modal</Text>
      </Button>
      <HistoryModal showModal={showModal} setShowModal={setShowModal} />
    </StyledBox>
  );
};
const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
});
export default NFTPage;
