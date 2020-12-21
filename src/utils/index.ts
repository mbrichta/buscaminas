import { MAX_COLUMNS, MAX_ROWS } from '../constants/index';
import { CellValue, CellState, CellType } from '../types/index';

export const generateCels = () => {

    const cells: CellType[][] = [];

    for (let rows = 0; rows < MAX_ROWS; rows++) {
        cells.push([]);

        for (let cols = 0; cols < MAX_COLUMNS; cols++) {
            cells[rows].push({
                value: CellValue.none,
                state: CellState.open,
            });
        };
    };

    return cells;
};