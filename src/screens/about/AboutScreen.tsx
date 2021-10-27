import React, { useState, useEffect, useCallback } from 'react';
import { Box, Image, ScrollView, Text } from 'native-base';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'utils/firebase';
import {SafeAreaView } from 'react-native';

interface Props {}

const AboutScreen = (props: Props) => {
  const [listStar, setListStar] = useState<any>([]);
  const getData = async () => {
    const resultCol = collection(db, 'constellation');
    const resultSnapshot = await getDocs(resultCol);
    const resultList = resultSnapshot.docs.map((doc: any) => doc.data());
    setListStar(resultList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Text>This is About Page</Text>
          {listStar.map((star:any) => (
            <Box key={star.name}> 
              <Text>{star.name}</Text>
              <Text>{star.desc}</Text>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
