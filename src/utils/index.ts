import { maxHeaderSize } from 'http';
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
                state: CellState.visible, //Make this open later
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

    return cells;
};