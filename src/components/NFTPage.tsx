import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Modal} from 'react-native';
import {VStack, Spinner, Image, Button, Text, Box} from '@gluestack-ui/themed';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import finalNFT from '../abi/finalNFT.json';
import axios from 'axios';
import {styled} from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import HistoryModal from './HistoryModal';

const NFTPage = () => {
  const StyledBox = styled(Box);
  const StyledBg = styled(LinearGradient);
  const StyledModal = styled(Modal);
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
      return <Spinner size="large" />;
    }
    return (
      <VStack justifyContent="center" alignItems="center">
        <Text>{tokenURI}</Text>
      </VStack>
    );
  };
  return (
    <VStack justifyContent="center" alignItems="center">
      {NFTSection()}
      <Button onPress={() => setShowModal(true)} ref={ref}>
        {/* <ButtonText>Show Modal</ButtonText> */}
      </Button>
      <HistoryModal showModal={showModal} setShowModal={setShowModal} />
    </VStack>
  );
};
const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
});
export default NFTPage;
