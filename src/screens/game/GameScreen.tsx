import { useNavigation, useRoute } from '@react-navigation/core';
import { Box } from 'native-base'
import React from 'react'
import { IRoute } from 'utils/utils';

interface Props {
  
}

const GameScreen = (props: Props) => {
  const route = useRoute<IRoute>();
  const navigation = useNavigation<any>();
  const item =
  Object.keys(route.params).length > 0 ? route.params.item : '';
  
  return (
    <Box>
      
    </Box>
  )
}

export default GameScreen
