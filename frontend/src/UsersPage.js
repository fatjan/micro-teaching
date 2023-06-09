import React, { useState, useEffect } from 'react';
import { getUsers } from './api/users';
import './usersPage.css';
import { useNavigate } from 'react-router-dom';
import { clearToken, clearCurrentUser } from './api/auth';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
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

  // Calculate indices for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="users-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="users-title">Users Page</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Number</th> {/* Add the numbered column */}
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td> {/* Add the numbered column */}
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
