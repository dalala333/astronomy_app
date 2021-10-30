import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Image, ScrollView, Text } from 'native-base';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'utils/firebase';
import { Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from 'components/Header';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  convertCategoryName,
  getFirestoreDB,
  IDataType,
  IRoute,
} from 'utils/utils';
import LoadingScreen from 'components/LoadingScreen';

interface Props {}

const DetailScreen = (props: Props) => {
  const { width, height } = Dimensions.get('window');

  const route = useRoute<IRoute>();
  const navigation = useNavigation<any>();
  const categoryName =
    Object.keys(route.params).length > 0 ? route.params.categoryName : '';
  const itemId =
    Object.keys(route.params).length > 0 ? route.params.itemId : '';

  const [info, setInfo] = useState<IDataType>({} as any);

  const getData = async () => {
    const result = await getFirestoreDB(categoryName);
    setInfo(result.filter((item) => item.id === itemId)[0] as any);
  };

  const navigateGame = () => {
    navigation.navigate('Game', {
      categoryName,
      itemId,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <Box>
        <Image
          style={{
            height: height,
            width: width,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          source={require('assets/bg-galaxy.jpg')}
          alt="bg-category"
        />
      </Box>
      <ScrollView>
        <Box style={{ marginBottom: 80 }}>
          <Header
            headerTitle={`${convertCategoryName(categoryName)}`}
            onPress={() =>
              navigation.navigate('ListItem', { categoryName: categoryName })
            }
            hasBackButton
          />
          {Object.keys(info).length > 0 ? (
            <>
              <Image
                source={{ uri: info.image }}
                style={{ width: '100%', height: 200 }}
                alt="image_star"
              />
              <Box alignItems="center">
                <Text bold fontSize={32} m="2" color="#fff">
                  {info.title}
                </Text>
                <Text
                  italic
                  fontSize={18}
                  color="#9cdfb7"
                  textTransform="uppercase"
                >
                  {categoryName}
                </Text>
                <TouchableOpacity onPress={navigateGame}>
                  <Box
                    borderWidth={1}
                    borderRadius={20}
                    borderColor="#2980B9"
                    paddingX="12"
                    paddingY="2"
                    mt="2"
                  >
                    <Text color="#2980B9">CHƠI GHÉP HÌNH</Text>
                  </Box>
                </TouchableOpacity>
              </Box>
              <Box alignItems="center" mt="2">
                <Container>
                  <Text fontSize={16} color="#fff">
                    {info.description}
                  </Text>
                </Container>
              </Box>
            </>
          ) : (
            <LoadingScreen />
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
