import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import Board from './pages/Board';
import CTF from './pages/CTF';
import Join from './pages/Join';
import Login from './pages/Login';
import Main from './pages/Main';
import Settings from './pages/Settings';

const App = () => {
    return (
        <React.Fragment>
            <BrowserRouter history={history}>
                <Header />
                <Routes>
                    <Route path="/" exact element={<Main />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/board/:type" exact element={<Board />} />
                    <Route path="/ctf" exact element={<CTF />} />
                    <Route path="/settings" exact element={<Settings />} />

                    <Route path="/join" exact element={<Join />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
