import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {VStack, Spinner, Button, Text, Box, HStack} from '@gluestack-ui/themed';
import axios from 'axios';
import {styled} from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import {View} from '@gluestack-ui/themed';

const Profile = () => {
  const StyledBox = styled(Box);
  const StyledText = styled(Text);
  const StyledVStack = styled(VStack);
  const userInfo = {
    first_name: 'N',
    account: 'N',
    email: 'N',
    wallet_address: 'N',
  };
  const textStyle = 'uppercase text-sm tracking-[1.12px] font-normal';

  return (
    <StyledVStack w="$full" gap="$4" tw="flex-1">
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>
          Full Name
        </StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {userInfo.first_name}
          </StyledText>
        </StyledBox>
      </VStack>
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>
          username
        </StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {userInfo.account}
          </StyledText>
        </StyledBox>
      </VStack>
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>email</StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {userInfo.email}
          </StyledText>
        </StyledBox>
      </VStack>
      <VStack w="$full">
        <StyledText className={`${textStyle} text-white/40`}>
          wallet address
        </StyledText>
        <StyledBox className=" border-t border-white/20 py-4">
          <StyledText className={`${textStyle} text-white`}>
            {userInfo.wallet_address}
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
