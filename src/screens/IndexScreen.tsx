import React, {useEffect, useState} from 'react';
import {Box, Text} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const IndexScreen = ({navigation}: any) => {
  const StyledText = styled(Text);
  const StyledBox = styled(Box);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
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
