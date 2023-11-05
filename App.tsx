import React from 'react';
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
import LoginScreen from './src/screens/LoginScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ProfileScreen from './src/screens/ProfileScreen';

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
          <Stack.Screen
            name="Gallery"
            component={GalleryScreen}
            options={headerOptions as any}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={headerOptions as any}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
