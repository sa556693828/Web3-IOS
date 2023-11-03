import React, {useState, useEffect} from 'react';
import {Box, Center, Text, VStack, Spinner, Image} from 'native-base';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import NFTABI from '../abi/abi.json';
import SBT from '../abi/SBT.json';
import {PRI_KEY, WALLET_ADDRESS} from '@env';
import Scale from './Scale';
import axios from 'axios';

const UserNFTs = ({account}) => {
  const [nfts, setNFTs] = useState([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  // const provider = new ethers.providers.JsonRpcProvider(
  //   'https://polygon-mumbai.g.alchemy.com/v2/ksd7SsZXL2XwHkGw0Nropnyhq3Bt-7kg',
  // );
  const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet-rpc.thundercore.com',
  );

  const address = WALLET_ADDRESS;
  const privateKey = PRI_KEY;
  // const contract = new ethers.Contract(NFTABI.address, NFTABI.abi, provider);
  const contract = new ethers.Contract(SBT.address, SBT.abi, provider);
  // const signer = new ethers.Wallet(privateKey, provider);
  // const contract = new ethers.Contract(NFTABI.address, NFTABI.abi, signer);
  // async function mint() {
  //   try {
  //     const result = await contract.safeMint(address, {
  //       gasLimit: 500000,
  //     });
  //     console.log('mint', result); // 處理函數調用的結果
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const getNFTs = async () => {
    setLoading(true);
    try {
      const balance = await contract.balanceOf(
        '0xf6ddbeaf0f71736a075cdc1afad00d25a236fe3c',
      );
      const Address = await contract.ownerOf(0);

      console.log('Address', Address);
      if (balance > 0) {
        const tokenURI = await contract.tokenURI(0);
        console.log('tokenURI', tokenURI);

        // // 從 URL 獲取 NFT 的元數據
        const response = await axios.get(tokenURI);
        const image = response?.data.image;
        console.log('response', response?.data);
        console.log('response', image);
        setImage(image);
        // const metadata = response.data;
        // console.log('NFT Metadata:', metadata);
      } else {
        console.log('The address does not own any NFTs.');
      }
      setLoading(false);
    } catch (error) {
      console.error('error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNFTs();
  }, [account]);

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <VStack
      // w="100%"
      // h="100%"
      space={2}
      justifyContent="center"
      alignItems="center">
      {/* <Scale /> */}
      <VStack justifyContent="center" alignItems="center">
        <Image source={{uri: `${image}`}} size="2xl" alt="NFT Image" />
      </VStack>
    </VStack>
  );
};

export default UserNFTs;
