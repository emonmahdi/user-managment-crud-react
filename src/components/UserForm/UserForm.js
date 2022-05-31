import React, { useEffect, useState } from 'react';

const UserForm = ({handleSubmitData, selectedUser, btnText}) => {
    const [user, setUser] = useState({
        username: '',
        email: ''
    });
    const {username, email} = user;
    // update user edit form
    useEffect(() => {
        setUser({
            username: selectedUser.username,
            email: selectedUser.email
        })
    },[selectedUser])
    // handleChange
    const handleChange = (e) => {
        const selectedField = e.target.name;
        const selectedValue = e.target.value;
        setUser((preState) => {
            return {...preState, [selectedField]: selectedValue}
        });
    }
    // handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitData(user);
        setUser({
            username: '', 
            email:''
        });
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="username">User Name:</label>
              <input type="text" name='username' id='username' onChange={handleChange} value={username} required />
          </div>
          <div>
              <label htmlFor="email">User Email:</label>
              <input type="email" name='email' id='email' onChange={handleChange} value={email}  required />
          </div>
          <button className='btn' type='submit'>{btnText}</button>
      </form>
    </div>
  )
}

UserForm.defaultProps = {
    selectedUser: {
        username: '',
        email: ''
    }
}

export default UserForm
