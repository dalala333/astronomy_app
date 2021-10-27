import { useNavigation } from '@react-navigation/core';
import { Box, Image } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

interface Props {}

const StartScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  const { height } = Dimensions.get('screen');

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Tab', { screen: 'Home' });
    }, 3000);
  }, []);
  return (
    <Box style={[styles.root, { width: '100%', height: height }]}>
      <Image source={require('assets/Aster.gif')} alt="star_loading" />
    </Box>
  );
};

const styles = StyleSheet.create({
  root: {},
});

export default StartScreen;
