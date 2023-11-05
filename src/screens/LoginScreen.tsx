import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import {EyeIcon, EyeOffIcon} from 'lucide-react-native';

const LoginScreen = ({navigation}: any) => {
  const StyledText = styled(Text);
  const StyledBox = styled(Box);
  const StyledInput = styled(Input);
  const StyledButton = styled(Button);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [password, setPassword] = useState('');
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  return (
    <StyledBox className="flex h-full items-center justify-center bg-black">
      <StyledText className="text-white text-5xl font-semibold">
        artisaNFT
      </StyledText>
      <StyledBox className="flex pt-2">
        <StyledText className="text-base text-white font-normal uppercase">
          {`CRAFT  MEETS  CRYPTO`}
        </StyledText>
      </StyledBox>
      <StyledBox className="w-[90%]">
        <FormControl pt="$10">
          <VStack space="lg" width="$full">
            <StyledInput className="bg-white/[0.08] border border-white/40 rounded-lg h-[61px]">
              <InputField
                type="text"
                color="$white"
                placeholder="Email"
                value={emailValue}
                onChangeText={text => setEmailValue(text)}
              />
            </StyledInput>
            <StyledInput className="bg-white/[0.08] border border-white/40 rounded-lg h-[61px]">
              <InputField
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                color="$white"
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="rgba(255, 255, 240, 0.40)"
                  size="lg"
                />
              </InputSlot>
            </StyledInput>
          </VStack>
        </FormControl>
      </StyledBox>
      <StyledText className="pt-6 underline text-white/40 tracking-[0.32px] text-base">
        Forget password?
      </StyledText>
      <StyledButton
        className="bg-white rounded-lg h-[61px] absolute bottom-10 w-[90%]"
        onPress={() => navigation.navigate('home')}>
        <StyledText className="text-black text-base">Sign in</StyledText>
      </StyledButton>
    </StyledBox>
  );
};

export default LoginScreen;
