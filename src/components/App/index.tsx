import React from 'react';
import NumberDisplay from '../NumberDisplay.js';
import './App.scss';

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="header">
                <NumberDisplay value={0} />
                <div className="face">😊</div>
                <NumberDisplay value={23} />
            </div>
            <div className="body">Body</div>
        </div>
    );
}

export default App;