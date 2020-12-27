import React, { useState } from 'react';
import { generateCels } from '../../utils/index';
import NumberDisplay from '../NumberDisplay';
import Cell from '../Cell'
import './App.scss';

const App: React.FC = () => {

    const [cells, setCells] = useState(generateCels());

    const renderCells = (): React.ReactNode => {
        return cells.map(
            (row, rowIndx) => row.map(
                (cell, cellIndx) => <Cell
                    key={`${rowIndx}-${cellIndx}`}
                    state={cell.state}
                    value={cell.value}
                    row={rowIndx}
                    col={cellIndx}
                />
            )
        )
    }

    return (
        <div className="app">
            <div className="header">
                <NumberDisplay value={0} />
                <div className="face">😊</div>
                <NumberDisplay value={23} />
            </div>
            <div className="body">{renderCells()}</div>
        </div>
    );
}

export default App;