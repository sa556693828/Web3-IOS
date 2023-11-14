import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text, Box, Spinner} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import {MarketContext} from '../context/MarketProvider';
import useLoginAccount from '../hooks/useLoginAccount';
import useUser from '../hooks/useUser';
import basic from '../abi/basic.json';
import axios from 'axios';
import {NFTData} from './NFTPage';

const Gallery = () => {
  const {userVid} = useContext(MarketContext);
  const {getAccount, accountData} = useLoginAccount();
  const {getUser, data, success} = useUser();
  const StyledBox = styled(Box);
  const StyledImage = styled(Image);

  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/rF-18JXiZ8TUtMsk0VUI1ppUq6gDzt9m',
  );
  const contract = new ethers.Contract(basic.address, basic.abi, provider);
  const [loading, setLoading] = useState(false);
  const [tokenURI, setTokenURI] = useState('');
  const [tokenID, setTokenID] = useState();
  const [NFTData, setNFTData] = useState<NFTData>({} as unknown as NFTData);

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
  }, [data, success, data?.wallet_address]);
  const NFTSection = () => {
    if (loading) {
      return (
        <StyledBox className="w-44 h-44 bg-white/20 rounded-lg flex justify-center items-center">
          <Spinner color="$white" />
        </StyledBox>
      );
    }
    return (
      <StyledBox className="w-44 h-44 rounded-lg">
        {NFTData.image && (
          <StyledImage
            className="rounded-lg w-full h-full"
            source={{
              uri: `${NFTData.image}`,
            }}
          />
        )}
      </StyledBox>
    );
  };
  return (
    <StyledBox className="flex flex-row flex-wrap gap-2">
      {NFTSection()}
      <StyledBox className="w-44 h-44 bg-transparent border border-white/20 rounded-lg" />
    </StyledBox>
  );
};
const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
});
export default Gallery;
