import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Spinner, Text, VStack} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import {EyeIcon, EyeOffIcon} from 'lucide-react-native';
import {TextInput} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import useLogin from '../hooks/useLogin';

const LoginScreen = ({navigation}: any) => {
  const StyledText = styled(Text);
  const StyledBox = styled(Box);
  const StyledButton = styled(Button);
  const StyledTextInput = styled(TextInput);
  const [loading, setLoading] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [passWordError, setPassWordError] = useState(false);
  const [account, setAccount] = useState('');
  const [passWord, setPassWord] = useState('');
  const {loginAccount} = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const {
    control,
    // formState: {isDirty},
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (data.username !== '' && data.password !== '') {
      try {
        const res = await loginAccount(data.username, data.password);
        if (res.code === 200) {
          navigation.navigate('home');
          // storeData(res.data)
          setLoading(false);
          return;
        } else if (res.code === 405) {
          setPassWordError(true);
          setLoading(false);
          return;
        } else {
          setAccountError(true);
          setPassWordError(true);
          setLoading(false);
        }
      } catch (err) {
        setAccountError(true);
        setPassWordError(true);
        setLoading(false);
      }
    } else {
      setAccountError(true);
      setPassWordError(true);
      setLoading(false);
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
                className={`${
                  accountError ? ' border-red-700' : 'border-white/40'
                } bg-white/[0.08] border rounded-lg h-[61px] text-white pl-4`}
                placeholder="User name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <StyledTextInput
                className={`${
                  passWordError ? ' border-red-700' : 'border-white/40'
                } bg-white/[0.08] border rounded-lg h-[61px] text-white pl-4 relative`}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
        className={`rounded-lg h-[61px] absolute bg-white bottom-10 w-[90%] flex items-center justify-center`}
        onPress={handleSubmit(onSubmit)}>
        <StyledText className="text-black text-base">
          {loading ? <Spinner size="small" color="$black" /> : 'Sign in'}
        </StyledText>
      </StyledButton>
    </StyledBox>
  );
};

export default LoginScreen;
