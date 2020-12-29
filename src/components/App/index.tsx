import React, { useEffect, useState } from 'react';
import { generateCels } from '../../utils/index';
import NumberDisplay from '../NumberDisplay';
import Cell from '../Cell'
import './App.scss';
import { CellState, CellType, FaceEmoji } from '../../types';

const App: React.FC = () => {

    const [gameOn, setGameOn] = useState(false)
    const [cells, setCells] = useState<CellType[][]>(generateCels());
    const [face, setFace] = useState<FaceEmoji>(FaceEmoji.smiling);
    const [timer, setTimer] = useState<number>(0)
    const [bombCounter, setBombCounter] = useState<number>(10);

    useEffect(() => {

        let gameTimer: any;
        if (gameOn && timer < 999) {
            gameTimer = setInterval(() => {
                setTimer(timer + 1)
            }, 1000);
        }

        return () => {
            clearInterval(gameTimer)
        }
    }, [gameOn, timer])

    const handleCellClick = (rowParam: number, colParam: number) => (): void => {

        //start the game
        if (!gameOn) {
            setGameOn(true)
            console.log(gameOn)
        }
    }

    const renderCells = (): React.ReactNode => {
        return cells.map(
            (row, rowIndx) => row.map(
                (cell, cellIndx) => <Cell
                    key={`${rowIndx}-${cellIndx}`}
                    state={cell.state}
                    value={cell.value}
                    row={rowIndx}
                    col={cellIndx}
                    face={face}
                    setFace={setFace}
                    onClick={handleCellClick}
                    onRightClick={rightClickHandler}
                />
            )
        )
    }

    const onFaceClickHandler = (): void => {
        if (gameOn) {
            setGameOn(false);
            setTimer(0);
            setCells(generateCels())
        }
    }

    const rightClickHandler = (rowParam: number, colParam: number) =>
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
            e.preventDefault();

            if (!gameOn) {
                return;
            }

            const currentCells = cells.slice();
            const currentCell = cells[rowParam][colParam];


            if (currentCell.state === CellState.visible) {
                return;
            } else if (currentCell.state === CellState.open) {
                currentCells[rowParam][colParam].state = CellState.flagged;
                setCells(currentCells);
                setBombCounter(bombCounter - 1);
            } else if (currentCell.state === CellState.flagged) {
                currentCells[rowParam][colParam].state = CellState.open;
                setBombCounter(bombCounter + 1);
            };
            console.log(bombCounter)

        }

    return (
        <div className="app">
            <div className="header">
                <NumberDisplay value={bombCounter} />
                <div className="face" onClick={onFaceClickHandler}>{face}</div>
                <NumberDisplay value={timer} />
            </div>
            <div className="body">{renderCells()}</div>
        </div>
    );
}

export default App;