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

            if (value === CellValue.bomb) {
                return <span className="bomb">💣</span>
            } else if (value === CellValue.none) {
                return null;
            }

            return value;

        } else if (state === CellState.flagged) {
            return <span className="flagged">🚩</span>
        } else return null;
    }

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        console.log(e.target)
    }

    return (
        <div className={`cell ${state === CellState.visible ? 'visible' : ''} value-${value}`}>
            {renderContent()}
        </div>
    )
};

export default Cell;