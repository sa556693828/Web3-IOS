import React, {useRef, useState} from 'react';
import {View, Animated, StyleSheet, Image} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

const Scale = () => {
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
    <PinchGestureHandler
      onGestureEvent={onPinchGestureEvent}
      onHandlerStateChange={onPinchHandlerStateChange}>
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>
        <Image
          style={styles.catsIntro}
          resizeMode="contain"
          source={require('../assets/catsintro.png')}
        />
      </Animated.View>
    </PinchGestureHandler>
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

export default Scale;
