import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Box} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import axios from 'axios';

const Gallery = () => {
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
export default Gallery;
