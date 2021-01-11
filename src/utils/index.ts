import { MAX_COLUMNS, MAX_ROWS, NUM_OF_BOMBS } from '../constants/index';
import { CellValue, CellState, CellType } from '../types/index';

const grabAllAdjecentCells = (
    cells: CellType[][], row: number, col: number): {
        topLeftCell: CellType | null;
        topCell: CellType | null;
        topRightCell: CellType | null;
        leftCell: CellType | null;
        rightCell: CellType | null;
        bottomRightCell: CellType | null;
        bottomCell: CellType | null;
        bottomLeftCell: CellType | null
    } => {
    const topLeftCell = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
    const topCell = row > 0 ? cells[row - 1][col] : null;
    const topRightCell = row > 0 && col < MAX_COLUMNS - 1 ? cells[row - 1][col + 1] : null;
    const leftCell = col > 0 ? cells[row][col - 1] : null;
    const rightCell = col < MAX_COLUMNS - 1 ? cells[row][col + 1] : null;
    const bottomRightCell = row < MAX_ROWS - 1 && col < MAX_COLUMNS - 1 ? cells[row + 1][col + 1] : null;
    const bottomCell = row < MAX_ROWS - 1 ? cells[row + 1][col] : null;
    const bottomLeftCell = row < MAX_ROWS - 1 && col > 0 ? cells[row + 1][col - 1] : null;

    return {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomRightCell,
        bottomCell,
        bottomLeftCell
    }
}

export const generateCels = () => {

    let cells: CellType[][] = [];

    // generate cells
    for (let rows = 0; rows < MAX_ROWS; rows++) {
        cells.push([]);
        for (let cols = 0; cols < MAX_COLUMNS; cols++) {
            cells[rows].push({
                value: CellValue.none,
                state: CellState.open, //Make this open later
            });
        };
    };

    // randomly place 10 bombs
    let bombsPlaced = 0;

    while (bombsPlaced < NUM_OF_BOMBS) {
        const randomRow = Math.floor(Math.random() * MAX_ROWS);
        const randomCol = Math.floor(Math.random() * MAX_COLUMNS);

        const currentCell = cells[randomRow][randomCol];
        if (currentCell.value !== CellValue.bomb) {
            cells = cells.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    if (randomRow === rowIndex && randomCol === colIndex) {
                        return {
                            ...cell,
                            value: CellValue.bomb
                        };
                    }

                    return cell;
                })
            );
            bombsPlaced++;
        }
    }

    //generate number value for cells
    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLUMNS; col++) {
            let numberValue = 0;

            const {
                topLeftCell,
                topCell,
                topRightCell,
                leftCell,
                rightCell,
                bottomRightCell,
                bottomCell,
                bottomLeftCell } = grabAllAdjecentCells(cells, row, col);

            if (topLeftCell && topLeftCell.value === CellValue.bomb) numberValue++;
            if (topRightCell && topRightCell.value === CellValue.bomb) numberValue++;
            if (topCell && topCell.value === CellValue.bomb) numberValue++;
            if (leftCell && leftCell.value === CellValue.bomb) numberValue++;
            if (rightCell && rightCell.value === CellValue.bomb) numberValue++;
            if (bottomLeftCell && bottomLeftCell.value === CellValue.bomb) numberValue++;
            if (bottomRightCell && bottomRightCell.value === CellValue.bomb) numberValue++;
            if (bottomCell && bottomCell.value === CellValue.bomb) numberValue++;

            if (numberValue > 0) {
                cells[row][col] = {
                    ...cells[row][col],
                    value: numberValue
                }
            }
        }
    }

    return cells;
};

export const openMultipleCells = (cells: CellType[][], rowParam: number, colParam: number): CellType[][] => {
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible || currentCell.state === CellState.flagged) {
        return cells;
    }

    const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomRightCell,
        bottomCell,
        bottomLeftCell } = grabAllAdjecentCells(cells, rowParam, colParam);

    let newCells = cells.slice();
    newCells[rowParam][colParam].state = CellState.visible;

    if (topLeftCell && topLeftCell.state === CellState.open) {
        if (topLeftCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam - 1, colParam - 1);
        } else {
            newCells[rowParam - 1][colParam - 1].state = CellState.visible;
        }
    }
    if (topCell && topCell.state === CellState.open) {
        if (topCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam - 1, colParam);
        } else {
            newCells[rowParam - 1][colParam].state = CellState.visible;
        }
    }
    if (topRightCell && topRightCell.state === CellState.open) {
        if (topRightCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam - 1, colParam + 1);
        } else {
            newCells[rowParam - 1][colParam + 1].state = CellState.visible;
        }
    }
    if (leftCell && leftCell.state === CellState.open) {
        if (leftCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam, colParam - 1);
        } else {
            newCells[rowParam][colParam - 1].state = CellState.visible;
        }
    }
    if (rightCell && rightCell.state === CellState.open) {
        if (rightCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam, colParam + 1);
        } else {
            newCells[rowParam][colParam + 1].state = CellState.visible;
        }
    }
    if (bottomLeftCell && bottomLeftCell.state === CellState.open) {
        if (bottomLeftCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam + 1, colParam - 1);
        } else {
            newCells[rowParam + 1][colParam - 1].state = CellState.visible;
        }
    }
    if (bottomCell && bottomCell.state === CellState.open) {
        if (bottomCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam + 1, colParam);
        } else {
            newCells[rowParam + 1][colParam].state = CellState.visible;
        }
    }
    if (bottomRightCell && bottomRightCell.state === CellState.open) {
        if (bottomRightCell.value === CellValue.none) {
            newCells = openMultipleCells(newCells, rowParam + 1, colParam + 1);
        } else {
            newCells[rowParam + 1][colParam + 1].state = CellState.visible;
        }
    }

    return newCells;
}