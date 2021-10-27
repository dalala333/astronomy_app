import { useNavigation } from '@react-navigation/core';
import Header from 'components/Header';
import LoadingScreen from 'components/LoadingScreen';
import { Box, Image, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { collection_list } from 'utils/firebase';
import { getFirestoreDB } from 'utils/utils';
import CardCategory from './components/CardCategory';

interface Props {}

const CategoryScreen = (props: Props) => {
  const { width, height } = Dimensions.get('window');
  const [categoryList, setCategoryList] = useState<any>({
    astrology: [],
    aurora: [],
    // binarystar: [],
    // blackhole: [],
    darkmatter: [],
    // dwarf: [],
    // eclipse: [],
    galaxy: [],
    meteor: [],
    meteorite: [],
    planet: [],
  });

  const getData = async () => {
    const [
      astrologyList,
      auroraList,
      // binaryStarList,
      // blackHoleList,
      darkMatterList,
      // dwarfList,
      // eclipseList,
      galaxyList,
      meteorList,
      meteoriteList,
      planetList,
    ] = await Promise.all(
      collection_list.map((category) => getFirestoreDB(category))
    );
    setCategoryList({
      ...categoryList,
      astrology: astrologyList,
      aurora: auroraList,
      // binarystar: binaryStarList,
      // blackhole: blackHoleList,
      darkmatter: darkMatterList,
      // dwarf: dwarfList,
      // eclipse: eclipseList,
      galaxy: galaxyList,
      meteor: meteorList,
      meteorite: meteoriteList,
      planet: planetList,
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box style={{ marginBottom: 80 }}>
          <Header headerTitle="Các loại hành tinh" hasBackButton={false} />
          {categoryList.astrology.length > 0 ? (
            <Box style={styles.listContainer}>
              {Object.keys(categoryList).map((item) => (
                <Box key={item}>
                  <CardCategory item={categoryList[item]} categoryName={item} />
                </Box>
              ))}
            </Box>
          ) : (
            <LoadingScreen />
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 180,
    borderRadius: 10,
    alignItems: 'center',
    margin: 6,
    borderWidth: 0.5,
  },
  imageStyle: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
});

export default CategoryScreen;
