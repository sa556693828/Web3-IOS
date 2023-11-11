import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Box} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import {MarketContext} from '../context/MarketProvider';
import useLoginAccount from '../hooks/useLoginAccount';
import useUser from '../hooks/useUser';
import basic from '../abi/basic.json';

const Gallery = () => {
  const {userVid} = useContext(MarketContext);
  const {getAccount, accountData} = useLoginAccount();
  const {getUser, data, success} = useUser();

  const StyledBox = styled(Box);

  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/rF-18JXiZ8TUtMsk0VUI1ppUq6gDzt9m',
  );
  const contract = new ethers.Contract(basic.address, basic.abi, provider);
  const [loading, setLoading] = useState(false);
  const [tokenURI, setTokenURI] = useState('');
  const [tokenID, setTokenID] = useState();

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
  return (
    <StyledBox className="flex flex-row flex-wrap gap-2">
      <StyledBox className="w-44 h-44 bg-white/20 rounded-lg">
        <Text>{tokenURI}</Text>
      </StyledBox>
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
