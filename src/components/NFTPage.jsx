import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Spinner, Image, Button, Text} from '@gluestack-ui/themed';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import finalNFT from '../abi/finalNFT.json';
import axios from 'axios';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const NFTPage = ({tokenId}) => {
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });
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

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <VStack justifyContent="center" alignItems="center" tw="gap-5">
      <Text>{tokenURI}</Text>
    </VStack>
  );
};
const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
});
export default NFTPage;
