import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Signup';
import Login from './Login';
import Feed from './Feed';
import UpdateUser from './UpdateUser';
import UsersPage from './UsersPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/update-user" component={UpdateUser} />
          <Route path="/users" element={< UsersPage ></UsersPage>} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
