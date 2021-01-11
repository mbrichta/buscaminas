import React, { useEffect, useState } from 'react';
import { generateCels, openMultipleCells } from '../../utils/index';
import NumberDisplay from '../NumberDisplay';
import Cell from '../Cell'
import './App.scss';
import { CellState, CellType, CellValue, FaceEmoji } from '../../types';
import { MAX_COLUMNS, MAX_ROWS } from '../../constants';

const App: React.FC = () => {

    const [gameOn, setGameOn] = useState(false)
    const [cells, setCells] = useState<CellType[][]>(generateCels());
    const [face, setFace] = useState<FaceEmoji>(FaceEmoji.smiling);
    const [timer, setTimer] = useState<number>(0)
    const [bombCounter, setBombCounter] = useState<number>(10);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [hasLost, setHasLost] = useState<boolean>(false);

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
    }, [gameOn, timer]);

    useEffect(() => {
        if (hasWon) {
            setFace(FaceEmoji.win);
        }
    }, [hasWon]);

    useEffect(() => {
        if (hasLost) {
            setFace(FaceEmoji.dead);
        }
    }, [hasLost]);

    const handleCellClick = (rowParam: number, colParam: number) => (): void => {
        console.log(rowParam, colParam);
        let newCells = cells.slice();

        //start the game
        if (!gameOn) {
            let isBomb = newCells[rowParam][colParam].value === CellValue.bomb;
            while (isBomb) {
                newCells = generateCels();
                if (newCells[rowParam][colParam].value !== CellValue.bomb) {
                    isBomb = false;
                    break;
                }
            }
            setGameOn(true);
        }

        const currentCell = newCells[rowParam][colParam];


        if (currentCell.state === CellState.flagged || currentCell.state === CellState.visible) {
            return;
        }

        if (currentCell.value === CellValue.bomb) {
            newCells.map((row, rowIndx) => row.map((col, colIndx) => {
                newCells[rowIndx][colIndx].state = CellState.visible;
            }))
            newCells[rowParam][colParam].red = true;
            setGameOn(false);
            setFace(FaceEmoji.dead);

        } else if (currentCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam, colParam);
        } else {
            newCells[rowParam][colParam].state = CellState.visible;
        }

        //check if you have won
        let safeCells = false;

        for (let row = 0; row < MAX_ROWS; row++) {
            for (let col = 0; col < MAX_COLUMNS; col++) {
                const currentCell = newCells[row][col];

                if (currentCell.value !== CellValue.bomb && currentCell.state === CellState.open) {
                    safeCells = true;
                    break;
                }
            }
        }

        if (!safeCells && currentCell.value !== CellValue.bomb) {
            newCells = newCells.map(row =>
                row.map(cell => {
                    if (cell.value === CellValue.bomb) {
                        return {
                            ...cell,
                            state: CellState.flagged
                        };
                    }
                    return cell;
                })
            );
            setHasWon(true);
        }

        setCells(newCells);
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
                    isRed={cell.red}
                />
            )
        )
    }

    const onFaceClickHandler = (): void => {
        if (gameOn) {
            setGameOn(false);
            setTimer(0);
            setCells(generateCels());
            setHasWon(false);
        } else {
            setGameOn(true);
            setTimer(0);
            setCells(generateCels());
            setFace(FaceEmoji.smiling);
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