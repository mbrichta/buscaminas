import React, { ReactNode } from 'react';
import { CellState, CellValue } from '../../types';
import './Cell.scss';

interface CellProps {
    state: CellState,
    value: CellValue,
    row: number,
    col: number
}

const Cell: React.FC<CellProps> = ({ state, value, row, col }) => {

    const renderContent = (): React.ReactNode => {
        if (state === CellState.visible) {

            value === CellValue.bomb && <div className="bomb">💣</div>

        } else if (state === CellState.flagged) {

        } else return null;
    }

    return (
        <div className={`cell ${state === CellState.visible ? 'visible' : ''}`}>
            {renderContent()}
        </div>
    )
};

export default Cell;