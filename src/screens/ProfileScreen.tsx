import {styled} from 'nativewind';
import React from 'react';
import NFTPage from '../components/NFTPage';
import {Box, Text} from '@gluestack-ui/themed';

const ProfileScreen = ({navigation}: any) => {
  const StyledBox = styled(Box);
  const StyledText = styled(Text);

  return (
    <StyledBox className="flex h-full justify-center items-center bg-black">
      {/* <StyledText className="text-base font-normal">
        by <StyledText className="text-2xl font-bold">SOOOUL</StyledText>
      </StyledText> */}
      <NFTPage />
    </StyledBox>
  );
};

export default ProfileScreen;
