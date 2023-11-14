import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Spinner, Button, Text, Box, HStack} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import {MarketContext} from '../context/MarketProvider';
import useLoginAccount from '../hooks/useLoginAccount';
import useUser from '../hooks/useUser';
import {useStorage} from '../hooks/useStorge';

const Profile = () => {
  const {userVid, firstTrigger} = useContext(MarketContext);
  const {getAccount, accountData} = useLoginAccount();
  const {getUser, data, success} = useUser();
  const StyledBox = styled(Box);
  const StyledText = styled(Text);
  const StyledVStack = styled(VStack);
  const userInfo = {
    first_name: 'N',
    account: 'N',
    email: 'N',
    wallet_address: 'N',
  };
  const textStyle = 'text-sm tracking-[1.12px] font-normal';

  useEffect(() => {
    getUser(userVid);
    getAccount(userVid);
  }, [userVid, firstTrigger]);

  return (
    <StyledVStack w="$full" gap="$4" tw="flex-1">
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>
          Full Name
        </StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {data?.first_name}
          </StyledText>
        </StyledBox>
      </VStack>
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>
          username
        </StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {accountData?.account}
          </StyledText>
        </StyledBox>
      </VStack>
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>email</StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {data?.email}
          </StyledText>
        </StyledBox>
      </VStack>
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>
          wallet address
        </StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {data?.wallet_address}
          </StyledText>
        </StyledBox>
      </VStack>
    </StyledVStack>
  );
};
const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
});
export default Profile;
