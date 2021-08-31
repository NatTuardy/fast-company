import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const people = () => {
      return number === 2 || number === 3 || number === 4
        ? "человека"
        : "человек";
    };
    return (
      <h4>
        <span className="badge m-2 h-12 bg-primary">{`${number} ${people()} тусанет с тобой сегодня`}</span>
      </h4>
    );
  };
  const getBageclasses = (color) => {
    let classes = "badge bg-";
    classes += color;
    return classes;
  };
  const renderUsers = () => {
    return users.map((user) => {
      return (
        <>
          <tr>
            <td>{user.name}</td>
            <td>
              {user.qualities.map((qua) => (
                <span className={getBageclasses(qua.color)}>{qua.name}</span>
              ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(user._id)}
              >
                delete
              </button>
            </td>
          </tr>
        </>
      );
    });
  };

  const renderTable = () => {
    return (
      <>
        {renderPhrase(users.length)}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </>
    );
  };

  
  return (
    <>
      {users.length === 0 ? (
        <h4>
          <span className="badge m-2 h-12 bg-danger">
            Никто не тусанет с тобой сегодня
          </span>
        </h4>
      ) : (
        renderTable()
      )}
    </>
  );
};

export default Users;
