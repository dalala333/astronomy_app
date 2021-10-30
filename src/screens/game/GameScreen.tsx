import { useNavigation, useRoute } from '@react-navigation/core';
import Header from 'components/Header';
import PuzzleGame from 'components/PuzzleGame';
import { Box, Button, Image, Modal, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { PuzzlePieces } from 'react-native-picture-puzzle';
import { getFirestoreDB, IDataType, IRoute } from 'utils/utils';

interface Props {}

const GameScreen = (props: Props) => {
  const { width, height } = Dimensions.get('window');

  const route = useRoute<IRoute>();
  const navigation = useNavigation<any>();
  const categoryName =
    Object.keys(route.params).length > 0 ? route.params.categoryName : '';
  const itemId =
    Object.keys(route.params).length > 0 ? route.params.itemId : '';
  // STATE
  const [info, setInfo] = useState<IDataType>({} as any);
  const [counting, setCounting] = useState(120);
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [pieces, setPieces] = useState<PuzzlePieces>([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);

  const checkWinning = () => {
    let win = true;
    pieces.map((value, index) => {
      if (value !== index) {
        win = false;
      }
    });
    return win;
  };

  const getData = async () => {
    const result = await getFirestoreDB(categoryName);
    setInfo(result.filter((item) => item.id === itemId)[0] as any);
  };

  useEffect(() => {
    if (counting > 0 && !showModal) {
      setTimeout(() => setCounting(counting - 1), 1000);
    } else {
      setShowModal(true);
    }
  }, [counting]);

  useEffect(() => {
    getData();
  }, []);

  if (Object.keys(info).length === 0) {
    return <Box />;
  }

  return (
    <Box>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="600px">
            <Modal.Body alignItems="center">
              <Text
                textAlign="center"
                fontSize={22}
                color={checkWinning() ? 'green.300' : 'red.300'}
              >
                {checkWinning()
                  ? 'Chúc mừng bạn đã thắng cuộc !!!'
                  : 'Thua mất rồi!!!. Cố gắng lần tiếp theo nhé'}
              </Text>
            </Modal.Body>
            <Modal.Footer justifyContent="center">
              <Button.Group space={2}>
                <Button
                  variant="outline"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('ListItem', {
                      categoryName: categoryName,
                    });
                  }}
                >
                  Trở lại danh sách
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}
      {showHint && (
        <Modal isOpen={showHint} onClose={() => setShowHint(false)}>
          <Modal.Content maxWidth="600px">
            <Modal.Body alignItems="center">
              <Image
                source={{ uri: info.image }}
                style={{ width: '100%', height: 200 }}
                alt="hint-img"
              />
            </Modal.Body>
            <Modal.Footer justifyContent="center">
              <Button.Group space={2}>
                <Button
                  variant="outline"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowHint(false);
                  }}
                >
                  Tiếp tục chơi
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}

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
      <Header
        headerTitle={`Trò chơi ghép hình`}
        onPress={() =>
          navigation.navigate('ListItem', { categoryName: categoryName })
        }
        hasBackButton
      />
      <Box alignItems="center" mb="5">
        <Text fontSize={20} color="#fff">
          Thời gian còn lại : {counting} giây
        </Text>
      </Box>
      <Box alignItems="center" mt="5">
        <PuzzleGame
          source={{ uri: info.image }}
          pieces={pieces}
          setPieces={setPieces}
          checkWinning={checkWinning}
          setShowModal={setShowModal}
        />
      </Box>
      <Box alignItems="center" mt="5">
        <TouchableOpacity onPress={() => setShowHint(true)}>
          <Box
            borderWidth={1}
            borderRadius={20}
            borderColor="#2980B9"
            paddingX="12"
            paddingY="2"
            mt="2"
          >
            <Text color="#2980B9">XEM GỢI Ý</Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default GameScreen;
