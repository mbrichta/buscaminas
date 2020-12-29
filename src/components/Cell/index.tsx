import React from 'react';
import { CellState, CellValue, FaceEmoji } from '../../types';
import './Cell.scss';

interface CellProps {
    state: CellState,
    value: CellValue,
    row: number,
    col: number,
    face: FaceEmoji,
    setFace: Function,
    onClick(rowParam: number, colParam: number): (...args: any[]) => void;
    onRightClick(rowParam: number, colParam: number): (...args: any[]) => void;
}

const Cell: React.FC<CellProps> = ({ state, value, row, col, face, setFace, onClick, onRightClick }) => {

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

    const handleMouseDown = (): void => {
        setFace(FaceEmoji.surprised)
    }

    const handleMouseUp = (): void => {
        setFace(FaceEmoji.smiling)
    }

    return (
        <div
            className={`cell ${state === CellState.visible ? 'visible' : ''} value-${value}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick(row, col)}
            onContextMenu={onRightClick(row, col)}
        >
            {renderContent()}
        </div>
    )
};

export default Cell;