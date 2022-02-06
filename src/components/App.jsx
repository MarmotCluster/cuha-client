import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './AddUser';
// import history from '../history';

import Header from './Header';
import Board from './pages/Board';
import CTF from './pages/CTF';
import ErrorPage from './pages/ErrorPage';
import Join from './pages/Join';
import Login from './pages/Login';
import Main from './pages/Main';
import Settings from './pages/Settings';
import User from './pages/User';

const App = () => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" exact element={<Main />} />
                    <Route path="login" exact element={<Login />} />
                    <Route path="board/:type" exact element={<Board />} />
                    <Route path="board" exact element={<Board />} />
                    <Route path="ctf" exact element={<CTF />} />
                    <Route path="settings" exact element={<Settings />} />

                    <Route path="member/:username" exact element={<User />} />

                    <Route path="join" exact element={<Join />} />
                    <Route path="addmember" exact element={<AddUser />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
