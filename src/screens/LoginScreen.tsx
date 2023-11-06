import React, {useRef, useState} from 'react';
import {Box, Button, Text, VStack} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import {EyeIcon, EyeOffIcon} from 'lucide-react-native';
import {TextInput} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

const LoginScreen = ({navigation}: any) => {
  const StyledText = styled(Text);
  const StyledBox = styled(Box);
  const StyledButton = styled(Button);
  const StyledTextInput = styled(TextInput);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log('data', data);
    if (data.email === 'admin' && data.password === 'admin') {
      navigation.navigate('home');
    }
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
        <VStack space="lg" width="$full" pt="$10">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                className="bg-white/[0.08] border border-white/40 rounded-lg h-[61px] text-white pl-4"
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                ref={emailRef}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                className="bg-white/[0.08] border border-white/40 rounded-lg h-[61px] text-white pl-4 relative"
                placeholder="Password"
                secureTextEntry={!showPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                ref={passwordRef}
              />
            )}
            name="password"
          />
          <Button
            as={showPassword ? EyeIcon : EyeOffIcon}
            onPress={handleState}
            style={
              {
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 240, 0.40)',
                position: 'absolute',
                bottom: 34,
                right: 0,
                zIndex: 10,
              } as any
            }
            size="lg"
          />
        </VStack>
      </StyledBox>
      <StyledText className="pt-6 underline text-white/40 tracking-[0.32px] text-base">
        Forget password?
      </StyledText>
      <StyledButton
        className={`rounded-lg h-[61px] absolute bottom-10 w-[90%] bg-white`}
        onPress={handleSubmit(onSubmit)}>
        <StyledText className="text-black text-base">Sign in</StyledText>
      </StyledButton>
    </StyledBox>
  );
};

export default LoginScreen;
