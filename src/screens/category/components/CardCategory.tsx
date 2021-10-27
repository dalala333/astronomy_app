import { useNavigation } from '@react-navigation/core';
import { Box, Image, Text } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { backgroundColor } from 'styled-system';
import { IDataType } from 'utils/utils';

interface Props {
  item: IDataType[];
  categoryName: string;
}

const CardCategory = (props: Props) => {
  const { item, categoryName } = props;
  const navigation = useNavigation<any>();
  const { width } = Dimensions.get('screen');

  const navigateList = () => {
    navigation.navigate('ListItem', { categoryName: categoryName });
  };

  if (item.length === 0) {
    return <Box />;
  }
  return (
    <TouchableOpacity onPress={navigateList}>
      <Box style={[styles.root, { width: width - 40 }]}>
        <Image
          source={{
            uri: item[Math.floor(Math.random() * item.length)].image,
          }}
          style={styles.imageStyle}
          alt="image"
        />
        <Text m="1" bold textTransform="uppercase">
          {categoryName}
        </Text>
        <Text m="1" italic>
          Bao gồm có {item.length} loại
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    alignItems: 'center',
    margin: 6,
    borderWidth: 0.5,
    borderColor:'#cecece',
    backgroundColor:'#fff'
  },
  imageStyle: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default CardCategory;
