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

  return (
    <StyledBox className="flex flex-row flex-wrap gap-2">
      <StyledBox className="w-44 h-44 bg-white/20 rounded-lg" />
      <StyledBox className="w-44 h-44 bg-white/20 rounded-lg" />
      <StyledBox className="w-44 h-44 bg-transparent border border-white/20 rounded-lg" />
    </StyledBox>
  );
};
const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
});
export default Profile;
