import {Text, Box} from 'native-base';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

const Slide = () => {
  const renderRightActions = () => {
    return (
      <View style={styles.rightActions}>
        <Text style={styles.actionText}>刪除</Text>
      </View>
    );
  };

  return (
    <Box tw="w-full">
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>
          <Text color="white">Slide me</Text>
        </View>
      </Swipeable>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#ad3729',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  rightActions: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  actionText: {
    color: '#fff',
  },
});

export default Slide;
