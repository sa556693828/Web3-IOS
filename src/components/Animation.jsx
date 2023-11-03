import React, {useRef, useState} from 'react';
import {Box, Button, Input, Text} from 'native-base';
import {Animated, StyleSheet} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

import UserNFTs from './UserNFTs';
import Slide from './Slide';

const Animation = ({navigation}) => {
  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const scale = Animated.multiply(baseScale, pinchScale);
  const [lastScale, setLastScale] = useState(1);

  const onPinchGestureEvent = Animated.event(
    [{nativeEvent: {scale: pinchScale}}],
    {useNativeDriver: true},
  );

  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setLastScale(lastScale * event.nativeEvent.scale);
      baseScale.setValue(lastScale * event.nativeEvent.scale);
      pinchScale.setValue(1);
    }
  };

  return (
    <Box
      className="flex h-full items-center justify-around p-12"
      bg={{
        linearGradient: {
          colors: ['#232526', '#414345', '#232526'],
          start: [1, 1],
          end: [0, 0],
        },
      }}>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}>
        <Animated.View style={[styles.container, {transform: [{scale}]}]}>
          {/* <Image
            style={styles.catsIntro}
            resizeMode="contain"
            source={require('../assets/catsintro.png')}
          /> */}
          <UserNFTs tokenId={'0'} />
        </Animated.View>
      </PinchGestureHandler>
      <Slide />
    </Box>
  );
};
const styles = StyleSheet.create({
  catsIntro: {
    width: 300,
    borderWidth: 1,
  },
  container: {
    alignItems: 'center',
  },
});
export default Animation;
