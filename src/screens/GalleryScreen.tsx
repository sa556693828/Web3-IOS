import {styled} from 'nativewind';
import React from 'react';
import {Box, Text} from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Gallery from '../components/Gallery';

const GalleryScreen = ({navigation}: any) => {
  const StyledBg = styled(LinearGradient);
  const StyledBox = styled(Box);
  const StyledText = styled(Text);
  const greyBg = '#6A7460';
  const yellowBg = '#B89950';

  return (
    <StyledBg
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.0, y: 1.0}}
      locations={[0, 0.45]}
      colors={[greyBg, '#131111']}
      className="flex h-full justify-center items-center">
      <StyledBox className="flex h-full justify-start items-center text-left pt-[120px] px-4 w-full">
        <StyledText className="text-white text-5xl font-semibold pb-20 w-full">
          artisaNFTs
        </StyledText>
        <Gallery />
      </StyledBox>
    </StyledBg>
  );
};

export default GalleryScreen;
