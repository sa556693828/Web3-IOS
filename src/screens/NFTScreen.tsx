import {styled} from 'nativewind';
import React from 'react';
import NFTPage from '../components/NFTPage';
import {Box, Text} from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';

const NFTScreen = ({navigation}: any) => {
  const StyledBg = styled(LinearGradient);

  return (
    <StyledBg
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.0, y: 1.0}}
      locations={[0, 0.45]}
      colors={['#6A7460', '#131111']}
      className="flex h-full justify-center items-center">
      <NFTPage />
    </StyledBg>
  );
};

export default NFTScreen;
