import React, {useContext, useEffect, useState} from 'react';
import {Box, Text} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useStorage} from '../hooks/useStorge';
import {MarketContext} from '../context/MarketProvider';

const IndexScreen = ({navigation}: any) => {
  const {logIn, trigger} = useContext(MarketContext);
  const data = useStorage('isLogin');
  const [isLogin, setIsLogin] = data;
  const contextData = useStorage('userVid');
  const [userVid] = contextData;
  const StyledText = styled(Text);
  const StyledBox = styled(Box);
  const nav = async () => {
    if (isLogin === 'true') {
      await logIn(userVid);
      await trigger();
      setTimeout(() => {
        navigation.navigate('home');
      }, 2000);
    } else if (isLogin === 'false') {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    }
  };
  useEffect(() => {
    nav();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
      <StyledBox className="flex h-full items-center justify-center bg-black">
        <StyledText className="text-white text-5xl font-semibold">
          artisaNFT
        </StyledText>
        <StyledBox className="flex pt-2">
          <StyledText className="text-base font-normal">
            by <StyledText className="text-2xl font-bold">SOOOUL</StyledText>
          </StyledText>
        </StyledBox>
      </StyledBox>
    </TouchableWithoutFeedback>
  );
};

export default IndexScreen;
