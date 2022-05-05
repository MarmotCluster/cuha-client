import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './AddUser';
import AdminHeader from './AdminHeader';
import EditUser from './EditUser';
// import history from '../history';

import Header from './Header';
import Admin from './pages/Admin';
import Board from './pages/Board';
import Challenges from './pages/Challenges';
import ChallengeView from './pages/ChallengeView';
import ChallengeCreate from './pages/ChallengeCreate';
import ErrorPage from './pages/ErrorPage';
import Join from './pages/Join';
import Login from './pages/Login';
import Main from './pages/Main';
import PostCreate from './pages/PostCreate';
import PostEdit from './pages/PostEdit';
import PostView from './pages/PostView';
import Settings from './pages/Settings';
import User from './pages/User';
import ChallengeEdit from './pages/ChallengeEdit';
import ChallengeSolution from './pages/ChallengeSolution';
import ChallengeCreateSolution from './pages/ChallengeCreateSolution';
import ChallengeEditSolution from './pages/ChallengeEditSolution';
import Ranking from './pages/Ranking';
import Toast from './Toast';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Toast />
        <Header />
        <AdminHeader />
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="login" exact element={<Login />} />
          <Route path="board/:type" exact element={<Board />} />
          <Route path="board" exact element={<Board />} />

          <Route path="challenge" exact element={<Challenges />} />
          <Route path="challenge/create" exact element={<ChallengeCreate />} />
          <Route path="challenge/view/:postId" exact element={<ChallengeView />} />
          <Route path="challenge/edit/:postId" exact element={<ChallengeEdit />} />
          <Route path="challenge/solution/:postId" exact element={<ChallengeSolution />} />
          <Route path="challenge/solution/create/:postId" exact element={<ChallengeCreateSolution />} />
          <Route path="challenge/solution/edit/:postId" exact element={<ChallengeEditSolution />} />

          <Route path="ranking" exact element={<Ranking />} />

          <Route path="settings" exact element={<Settings />} />

          <Route path="post/:type/:postId" exact element={<PostView />} />
          <Route path="post/edit/:type/:postId" exact element={<PostEdit />} />
          <Route path="post/create/:type" exact element={<PostCreate />} />
          <Route path="post/create" exact element={<PostCreate />} />

          <Route path="member/:username" exact element={<User />} />
          <Route path="editmember/:username" exact element={<EditUser />} />

          <Route path="join" exact element={<Join />} />
          <Route path="addmember" exact element={<AddUser />} />

          <Route path="admin" exact element={<Admin />} />
          <Route path="admin/:type" exact element={<Admin />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
