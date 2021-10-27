import { useNavigation } from '@react-navigation/core';
import { Box, Image } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

interface Props {}

const LoadingScreen = (props: Props) => {
  const { height } = Dimensions.get('screen');
  return (
    <Box style={[styles.root, { width: '100%', height: height }]}>
      <Image
        source={require('assets/loading.gif')}
        alt="gif_loading"
        style={{ marginBottom: 100 }}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
