import React, { useState, useEffect } from 'react';
import { getUsers } from './api/users';
import './usersPage.css';
import { useNavigate } from 'react-router-dom';
import { clearToken, clearCurrentUser } from './api/auth';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and current user from local storage
    clearToken();
    clearCurrentUser();

    navigate('/login'); // Navigate to the login page after logout
  };

  useEffect(() => {
    // Fetch users from the API endpoint
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="users-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="users-title">Users Page</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
