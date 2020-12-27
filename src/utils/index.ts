import { MAX_COLUMNS, MAX_ROWS, NUM_OF_BOMBS } from '../constants/index';
import { CellValue, CellState, CellType } from '../types/index';

export const generateCels = () => {

    const cells: CellType[][] = [];

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
            // cells = cells.map((row, rowIndx) => row.map((col, colIndx) => {
            //     if (randomRow === rowIndx && randomCol === colIndx) {
            //         return {
            //             ...cell,
            //             value: CellValue.bomb
            //         }
            //     }
            // }))

            cells[randomRow][randomCol] = {
                ...cells[randomRow][randomCol],
                value: CellValue.bomb
            }
            bombsPlaced++;
        }
    }

    //generate number value for cells
    for (let row = 0; row < MAX_ROWS; row++) {
        for (let col = 0; col < MAX_COLUMNS; col++) {
            let numberValue = 0;
            const topLeftCell = row > 0 && col > 0 ? cells[row - 1][col - 1] : null;
            const topCell = row > 0 ? cells[row - 1][col] : null;
            const topRightCell = row > 0 && col < MAX_COLUMNS - 1 ? cells[row - 1][col + 1] : null;
            const leftCell = col > 0 ? cells[row][col - 1] : null;
            const rightCell = col < MAX_COLUMNS - 1 ? cells[row][col + 1] : null;
            const bottomRightCell = row < MAX_ROWS - 1 && col < MAX_COLUMNS - 1 ? cells[row + 1][col + 1] : null;
            const bottomCell = row < MAX_ROWS - 1 ? cells[row + 1][col] : null;
            const bottomLeftCell = row < MAX_ROWS - 1 && col > 0 ? cells[row + 1][col - 1] : null;

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