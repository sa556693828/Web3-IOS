import {styled} from 'nativewind';
import React from 'react';
import Profile from '../components/Profile';
import {Box, Button, Text} from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({navigation}: any) => {
  const StyledBg = styled(LinearGradient);
  const StyledBox = styled(Box);
  const StyledText = styled(Text);
  const StyledButton = styled(Button);
  const greyBg = '#6A7460';
  const yellowBg = '#B89950';
  return (
    <StyledBg
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.0, y: 1.0}}
      locations={[0, 0.45]}
      colors={[greyBg, '#131111']}
      className="flex h-full justify-center items-center">
      <StyledBox className="flex h-full justify-between items-center text-left pt-[120px] px-4 w-full pb-6">
        <StyledText className="text-white text-5xl font-semibold pb-20 w-full">
          Profile
        </StyledText>
        <Profile />
        <StyledButton
          className="w-full h-[61px] bg-white"
          onPress={() => navigation.navigate('Login')}>
          <StyledText className="text-black">Logout</StyledText>
        </StyledButton>
      </StyledBox>
    </StyledBg>
  );
};

export default ProfileScreen;
