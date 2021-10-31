import React, { useState, useCallback, useEffect } from 'react';
import { Box } from 'native-base';
import { PicturePuzzle, PuzzlePieces } from 'react-native-picture-puzzle';
import { ActivityIndicator } from 'react-native';
import { samples_puzzle } from './sample';

interface Props {
  pieces: PuzzlePieces;
  setPieces: React.Dispatch<React.SetStateAction<PuzzlePieces>>;
  source: any;
  setCheckWin: any;
  setShowModal: any;
}

const PuzzleGame = (props: Props) => {
  const { pieces, setPieces, source, setShowModal, setCheckWin } = props;
  const [hidden, setHidden] = useState<number | null>(0); // piece to obscure

  const renderLoading = useCallback(
    (): JSX.Element => <ActivityIndicator />,
    []
  );

  const checkWinning = (nextPieces: any) => {
    let count = 0;
    nextPieces.map((value: any, index: any) => {
      console.log(value, index);
      if (value !== index) {
        count++;
      }
    });
    return count === 0;
  };

  const onChange = useCallback(
    (nextPieces: PuzzlePieces, nextHidden: number | null): void => {
      setPieces([...nextPieces]);
      setHidden(nextHidden);
      if (checkWinning(nextPieces)) {
        setCheckWin(true);
        setShowModal(true);
      }
    },
    [setPieces, setHidden]
  );

  useEffect(() => {
    setPieces(
      samples_puzzle[Math.floor(Math.random() * samples_puzzle.length)]
    );
  }, []);

  return (
    <Box style={{ backgroundColor: '#cecece', padding: 2 }}>
      <PicturePuzzle
        size={300}
        pieces={pieces}
        hidden={hidden}
        onChange={onChange}
        source={source}
        renderLoading={renderLoading}
      />
    </Box>
  );
};

export default PuzzleGame;
