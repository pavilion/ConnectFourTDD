import * as React from "react";
import Cell from "./Cell";
import { View, Text } from "react-native";

type BoardProps = {
  nRows: number;
  nColumns: number;
};

export default function Board({ nColumns, nRows }: BoardProps) {
  const [boardValues, setBoardValues] = React.useState(
    Array(nRows)
      .fill(null)
      .map(e => {
        return (e = Array.from(Array(nColumns).fill(null)));
      })
  );
  const [currPlayer, setCurrPlayer] = React.useState("X");
  const [isGameFinished, setIsGameFinished] = React.useState(false);

  async function handleCellPress(columnIndex: number) {
    const emptyRowIndex = givenColumnIndexGetEmptyRowIndex(columnIndex);
    if (boardValues[emptyRowIndex][columnIndex] === null) {
      await setBoardValues(prevState => {
        const newBoardValues = prevState.slice();
        newBoardValues[emptyRowIndex][columnIndex] = currPlayer;
        return newBoardValues;
      });
      if (checkWin()) setIsGameFinished(true);
      else setCurrPlayer(prevState => (prevState === "X" ? "O" : "X"));
    }
  }

  function givenColumnIndexGetEmptyRowIndex(columnIndex: number) {
    let emptyRowIndex = 3;
    boardValues.forEach(
      (e, i) => e[columnIndex] === null && (emptyRowIndex = i)
    );
    return emptyRowIndex;
  }

  function checkWin() {
    return (
      checkHorizontalWin() ||
      checkVerticalWin() ||
      checkLeftDiagonalWin() ||
      checkRightDiagonalWin()
    );
  }

  function checkHorizontalWin(): boolean {
    return boardValues.some(
      row => row.every(e => e === "X") || row.every(e => e === "O")
    );
  }

  function checkVerticalWin(): boolean {
    return boardValues
      .map((_, i) => boardValues.map(el => el[i]))
      .some(row => row.every(e => e === "X") || row.every(e => e === "O"));
  }

  function checkLeftDiagonalWin(): boolean {
    let leftDiagonal: any[] = [];
    boardValues.forEach((row, rowIndex) => {
      row.forEach((e, i) => rowIndex === i && leftDiagonal.push(e));
    });

    return leftDiagonal.every(
      e => e === "X" || leftDiagonal.every(e => e === "O")
    );
  }

  function checkRightDiagonalWin(): boolean {
    let arr = [];

    for (let i = boardValues.length - 1; i > 0; i--) {
      for (let j = 0; j < boardValues.length; j++) {
        arr.push(boardValues[i][j]);
        i--;
      }
    }

    return arr.every(e => e === "X") || arr.every(e => e === "O");
  }

  return (
    <>
      {boardValues.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {row.map((_: [], columnIndex: number) => {
              return (
                <Cell
                  key={columnIndex}
                  value={boardValues[rowIndex][columnIndex]}
                  onPress={() => handleCellPress(columnIndex)}
                />
              );
            })}
          </View>
        );
      })}
      {isGameFinished && <Text>{currPlayer} won</Text>}
    </>
  );
}
