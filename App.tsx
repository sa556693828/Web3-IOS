import React from 'react';
import './shim';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import IndexScreen from './src/screens/IndexScreen';
import NFTScreen from './src/screens/NFTScreen';
import LoginScreen from './src/screens/LoginScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {UserSquare, GalleryHorizontalEnd, Grid2x2} from 'lucide-react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
  const Tab = createMaterialTopTabNavigator();
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#131111',
            borderTopColor: '#fffff033',
            borderTopWidth: 1,
            paddingVertical: 16,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#fffff0',
            height: 4,
            width: 56,
            borderBottomEndRadius: 100,
            borderBottomStartRadius: 100,
            top: 0,
            left: '9.9%',
          },
          tabBarActiveTintColor: '#fffff0',
          tabBarInactiveTintColor: '#fffff060',
        }}
        initialRouteName="NFT"
        tabBarPosition="bottom">
        <Tab.Screen
          name="NFT"
          component={NFTScreen}
          options={{
            tabBarIcon: ({color, size}: any) => (
              <GalleryHorizontalEnd color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            tabBarIcon: ({color, size}: any) => (
              <Grid2x2 color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}: any) => (
              <UserSquare color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
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
            name="home"
            component={HomeTabs}
            options={headerOptions as any}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
