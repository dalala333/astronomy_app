import { useNavigation, useRoute } from '@react-navigation/core';
import Header from 'components/Header';
import PuzzleGame from 'components/PuzzleGame';
import { Box, Button, Image, Modal, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, Animated } from 'react-native';
import { PuzzlePieces } from 'react-native-picture-puzzle';
import { getFirestoreDB, IDataType, IRoute } from 'utils/utils';

interface Props {}

const CheerStatement = [
  'Cố lên bạn ơi, bạn đang đi đúng hướng rồi !!!',
  'Đừng bỏ cuộc nhé, chúng ta đang đi đến đích rồi !!!',
  'Bạn sắp hoàn thiện hình vẽ rồi, cố lên nhé !!!',
  'Đừng bỏ cuộc nhé, bạn sắp thành công rồi đấy !!!',
  'Bạn sẽ hoàn thành bức ghép này ngay thôi !!!',
];

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
  const [checkWin, setCheckWin] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const [displayTime, setDislayTime] = useState(
    Math.floor(Math.random() * CheerStatement.length)
  );

  const [pieces, setPieces] = useState<PuzzlePieces>([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);

  const getData = async () => {
    const result = await getFirestoreDB(categoryName);
    setInfo(result.filter((item) => item.id === itemId)[0] as any);
  };

  const fadeInText = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutText = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (counting > 0 && !showModal) {
      setTimeout(() => setCounting(counting - 1), 1000);
    }
    if (counting === 90 || counting === 60 || counting === 30) {
      fadeInText();
    }
    if (counting === 87 || counting === 57 || counting === 27) {
      fadeOutText();
    }
    if (counting === 80 || counting === 50 || counting === 20) {
      setDislayTime(Math.floor(Math.random() * CheerStatement.length));
    }
    if (counting === 0) {
      setShowModal(true);
    }
  }, [counting]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (info && Object.keys(info).length === 0) {
    return <Box />;
  }

  return (
    <Box>
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          avoidKeyboard
        >
          <Modal.Content maxWidth="600px">
            <Modal.Body alignItems="center">
              <Text
                textAlign="center"
                fontSize={22}
                color={checkWin ? 'green.300' : 'red.300'}
              >
                {checkWin
                  ? 'Chúc mừng bạn đã thắng cuộc !!!'
                  : `Thua mất rồi!!! ${'\n'} Cố gắng lần tiếp theo nhé`}
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
      {/* Hint Modal Game */}
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
      {/* ANIMATED */}
      <Box alignItems="center">
        <Animated.View
          style={{
            opacity: opacity,
            width: '90%',
          }}
        >
          <Text
            fontSize={22}
            color="#FBD786"
            textTransform="uppercase"
            textAlign="center"
          >
            {CheerStatement[displayTime]}
          </Text>
        </Animated.View>
      </Box>
      <Box alignItems="center" mt="18">
        <PuzzleGame
          source={{ uri: info.image }}
          pieces={pieces}
          setPieces={setPieces}
          setCheckWin={setCheckWin}
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
