import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  Center,
  Text,
  VStack,
  Fab,
  AddIcon,
  Spinner,
  useToast,
} from 'native-base';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import {ethereum} from '../helpers/createWeb3Wallet';
import {useWeb3} from '../context/Web3Context';
import {ScrollView} from 'react-native';
import {shortenAddress} from '../helpers/shortenAddress';
import NFTABI from '../abi/abi.json';
import UserNFTs from './UserNFTs';

const Home = () => {
  const {IPFS_IMAGE_HASH, connectWallet, account} = useWeb3();
  const toast = useToast();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => {
    console.log('MINT NFT');
    if (!ethereum) {
      return 'Please install MetaMask!';
    }
    const provider = new ethers.providers.Web3Provider(ethereum, 'any');
    if (!provider) {
      console.log('Provider not found');
      return 'Provider not found';
    }
    try {
      const signer = provider.getSigner();
      if (!signer) {
        console.log('Signer not found');
        return 'Signer not found';
      }
      const contract = new ethers.Contract(NFTABI.address, NFTABI.abi, signer);
      const transaction = await contract.mintAward(account, IPFS_IMAGE_HASH);
      console.log('TX', transaction);
      const tx = await transaction.wait();
      console.log('TX', tx);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const mintUserNFT = async () => {
    setLoading(true);
    try {
      const error = await mintNFT();
      setLoading(false);

      if (error) {
        console.log(error);
        toast.show({
          title: 'Error',
          status: 'error',
          description: error,
        });
      } else {
        toast.show({
          title: 'NFT Minted',
          status: 'success',
          description: 'Your NFT has been minted!',
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.show({
        title: 'Error',
        status: 'error',
        description: error,
      });
    }
  };

  const returnUserAccountDetails = () => {
    return (
      <VStack
        w="100%"
        bg="primary.600"
        h="200"
        justify="center"
        align="center"
        p="20">
        <Center>
          <Text fontSize="lg">Account</Text>
          <Text bold fontSize="xl">
            {account ? shortenAddress(account) : 'Not Connected'}
          </Text>

          <Text fontSize="lg">Balance</Text>
          <Text bold fontSize="lg">
            {Number(balance).toFixed(4)} MATIC
          </Text>
        </Center>
      </VStack>
    );
  };

  return (
    <ScrollView>
      {returnUserAccountDetails()}
      {!account && (
        <Button
          variant="link"
          colorScheme="secondary"
          onPress={connectWallet}
          p="30">
          Connect to Metamask
        </Button>
      )}
       <UserNFTs account={account} />
      {account && <UserNFTs account={account} />}
      <Fab
        shadow={2}
        size="sm"
        icon={
          loading ? (
            <Spinner />
          ) : (
            <AddIcon color="white" name="plus" size="sm" />
          )
        }
        label={loading ? 'Loading' : 'Create NFT'}
        bg="primary.600"
        bottom={50}
        disabled={loading}
        onPress={mintUserNFT}
      />
    </ScrollView>
  );
};

export default Home;
