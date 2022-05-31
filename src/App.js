import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm/UserForm";

// Api Link
const URL = "https://rest-api-without-db.herokuapp.com/users/";

function App() {
  const [users, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // upate state
  const [selectedUser, setSelectedUser] = useState({
    username: '',
    email: ''
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('')

  // all users get
  const getAllUsers = () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not get Api Data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data.users);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Delete Handler
  const handleDelete = (id) => {
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not Delete");
        }
        getAllUsers();
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  // user add function
  const addUser = (user) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((res) => {
      if (res.status === 201) {
        getAllUsers()
      } else{
        throw Error("Could not Add User");
      }
    }) 
    .catch((err) => {
      setError(err.message);
    }) 
  }
  //handleEdit
  const handleEdit = (id) => {
    setSelectedUserId(id);
    setUpdateFlag(true);
    const filteredData = users.filter((user) => user.id === id);
    console.log(filteredData[0].username)
    setSelectedUser({
      username:filteredData[0].username,
      email:filteredData[0].email,
    })
  }

  // handleUpdate
  const handleUpdate = (user) => {
    fetch(URL + `${selectedUserId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not Update user"); 
      }  
      getAllUsers()
      setUpdateFlag(false)
    }) 
    .catch((err) => {
      setError(err.message);
    }) 
  }

  return (
    <div className="App">
      <h1>User Management App</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {updateFlag ? <UserForm btnText="Update User" handleSubmitData={handleUpdate} selectedUser={selectedUser} /> : <UserForm btnText="Add User" handleSubmitData={addUser} />}
      

      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article className="card" key={id}>
                <h2>{username}</h2>
                <h3>{email}</h3>
                <button className="btn" onClick={() => {
                    handleEdit(id);
                  }}>Edit</button>
                <button
                  className="btn"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Delete
                </button>
              </article>
            );
          })}
      </section>
    </div>
  );
}

export default App;
