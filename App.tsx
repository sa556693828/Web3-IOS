/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import './shim';
import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import './shim';
import {styled} from 'nativewind';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IndexScreen from './src/screens/IndexScreen';
import NFTScreen from './src/screens/NFTScreen';
import AnimationScreen from './src/screens/AnimationScreen';
import LoginScreen from './src/screens/LoginScreen';

const StyledView = styled(Text);
const Stack = createStackNavigator();

const headerOptions = ({route, navigation}: any) => ({
  title: route.name ? route.name : '',
  // 路由的參數判斷
  headerTintColor: 'white',
  headerTitleStyle: {
    alignSelf: 'center',
    fontSize: 16,
  }, // header 樣式
  headerStyle: {
    height: 0,
  },
});
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={headerOptions as any}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={headerOptions as any}
          />
          <Stack.Screen
            name="NFT"
            component={NFTScreen}
            options={headerOptions as any}
          />
          {/* <Stack.Screen
            name="Animation"
            component={AnimationScreen}
            options={headerOptions}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
