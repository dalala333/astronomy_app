import { useNavigation } from '@react-navigation/core';
import { Box, Image, Text } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { IDataType } from 'utils/utils';

interface Props {
  item: IDataType;
  categoryName: string;
}

const CardItem = (props: Props) => {
  const { item, categoryName } = props;
  const navigation = useNavigation<any>();
  const { width } = Dimensions.get('screen');

  const navigateDetail = () => {
    navigation.navigate('DetailScreen', {
      categoryName: categoryName,
      itemId: item.id,
    });
  };
  return (
    <TouchableOpacity onPress={navigateDetail}>
      <Box style={[styles.root, { width: (width - 40) / 2 }]}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.imageStyle}
          alt="image"
        />
        <Text p="2" bold textAlign="center" numberOfLines={2}>
          {item.title}
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
    height: 200,
    borderColor: '#cecece',
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default CardItem;
