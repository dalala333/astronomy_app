import { useNavigation } from '@react-navigation/core';
import { Box, Container, Image, ScrollView, Text } from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { collection_list } from 'utils/firebase';
import { getFirestoreDB } from 'utils/utils';

interface Props {}

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = (props: Props) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);

  let objectList: any = {};

  const getData = async () => {
    const [
      astrologyList,
      auroraList,
      binaryStarList,
      // blackHoleList,
      darkMatterList,
      dwarfList,
      // eclipseList,
      galaxyList,
      meteorList,
      meteoriteList,
      planetList,
    ] = await Promise.all(
      collection_list.map((category) => getFirestoreDB(category))
    );
    objectList = {
      astrology: astrologyList,
      aurora: auroraList,
      binary: binaryStarList,
      // blackhole: blackHoleList,
      darkmatter: darkMatterList,
      dwarfStar: dwarfList,
      // eclipse: eclipseList,
      galaxy: galaxyList,
      meteor: meteorList,
      meteorite: meteoriteList,
      planet: planetList,
    };
  };

  // const exploreBtn = () => {
  //   const categoryNameRandom =
  //     collection_list[Math.floor(Math.random() * collection_list.length)];
  //   const listRandom = objectList[categoryNameRandom];

  //   const itemRandom =
  //     listRandom[Math.floor(Math.random() * listRandom.length)];
  //   navigation.navigate('Category', {
  //     screen: 'DetailScreen',
  //     params: {
  //       categoryName: categoryNameRandom,
  //       itemId: itemRandom.id,
  //     },
  //   });
  // };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getData();
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box style={{ width: width, height: height }}>
          <Box style={{ width: width }}>
            <Image
              source={require('assets/home-bg.png')}
              alt="home-bg"
              style={{ width: width }}
            />
          </Box>
          <Box width="100%" alignItems="center">
            <Container m="4">
              <Text color="#fff" fontSize={18}>
                Aster l?? ???ng d???ng thi??n v??n ???????c th??nh l???p b???i c??c b???n h???c sinh
                tr?????ng H?? N???i - Amsterdam nh???m chia s??? nhi???u h??n t???i c???ng ?????ng
                Vi???t Nam ??am m?? c???a ch??ng m??nh. Ch??ng m??nh mong r???ng Aster s???
                g??p ph???n n??o nhen nh??m trong c??c b???n t??nh y??u v???i v?? tr??? bao la!
              </Text>
            </Container>
          </Box>
          <Box alignItems="center">
            {/* <TouchableOpacity onPress={exploreBtn}>
              <Box style={styles.boxStyle}>
                <Text color="#FFF">Kh??m ph?? ngay</Text>
              </Box>
            </TouchableOpacity> */}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {},
  boxStyle: {
    borderWidth: 0.5,
    // borderColor: '#cecece',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#2C0078',
  },
});

export default HomeScreen;
