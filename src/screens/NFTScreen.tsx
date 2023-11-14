import {styled} from 'nativewind';
import React from 'react';
import NFTPage from '../components/NFTPage';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const NFTScreen = ({navigation}: any) => {
  const StyledBg = styled(LinearGradient);
  const greyBg = '#6A7460';

  return (
    <StyledBg
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.0, y: 1.0}}
      locations={[0, 0.45]}
      colors={[greyBg, '#131111']}
      className="flex flex-1 justify-center items-center">
      <NFTPage />
    </StyledBg>
  );
};

export default NFTScreen;
