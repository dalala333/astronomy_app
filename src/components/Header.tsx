import { Box, Image, Text } from 'native-base';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Icon, { Icons } from './Icons';

interface Props {
  headerTitle: string;
  onPress?: () => void;
  hasBackButton?: boolean;
}

const Header = (props: Props) => {
  const { headerTitle, onPress, hasBackButton = true } = props;
  return (
    <Box style={styles.headerContainer}>
      {hasBackButton && (
        <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
          <Icon type={Icons.AntDesign} name="leftcircleo" color="#fff" />
        </TouchableOpacity>
      )}
      <Text fontSize={20} bold color={'#fff'} pt="4" pb="4">
        {headerTitle}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  btnStyle: {
    position: 'absolute',
    left: 20,
    top: '35%',
  },
  imageStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default Header;
