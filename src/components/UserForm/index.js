import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

import './index.css'

const UserForm = (props) => {
  const { user, users, setUsers, setSelectedUser, setIsPopupOpen } = props

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company.name || ''
  })

  const addNewUserForm = async (event) => {
    event.preventDefault()

    const nextId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    const newUser = {
      id: nextId,
      uuid: uuidv4(),
      name: formData.name,
      email: formData.email,
      company: { name: formData.company },
      isNew: true
    }

    const url = 'https://jsonplaceholder.typicode.com/users';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }

    try {
      const response = await fetch(url, options)
      // console.log(response)
      if (response.ok) {
        const addedUser = await response.json()
        setUsers(prevUsers => [...prevUsers, { id: addedUser.id || nextId, ...newUser }])
        setIsPopupOpen(false)
        setFormData({ name: '', email: '', company: '' }) // Reset the user form
        // setSelectedUser(null);
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const updateUserForm = async (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      company: { name: formData.company }
    };

    if (user.isNew) {
      setUsers((prevUsers) =>
        prevUsers.map((unique) => (unique.id === user.id ? updatedUser : unique))
      );
      setIsPopupOpen(false)
      setSelectedUser(null);
    } else {
      const url = `https://jsonplaceholder.typicode.com/users/${user.id}`;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      };

      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const updatedUserData = await response.json();
          setUsers((prevUsers) =>
            prevUsers.map((unique) => (unique.id === user.id ? updatedUserData : unique))
          );
          setIsPopupOpen(false)
          setFormData({ name: '', email: '', company: '' })
          setSelectedUser(null);
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const onChangeInputElement = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='user-form-main-container'>
      <h2 className='user-form-heading'>{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={user ? updateUserForm : addNewUserForm}>
        <label className='user-label'>Name</label>
        <input
          type='text'
          name='name'
          className='user-input'
          onChange={onChangeInputElement}
          value={formData.name}
          required
        />
        <label className='user-label'>Email</label>
        <input
          type='email'
          name='email'
          className='user-input'
          onChange={onChangeInputElement}
          value={formData.email}
          required
        />
        <label className='user-label'>Department</label>
        <input
          type='text'
          name='company'
          className='user-input'
          onChange={onChangeInputElement}
          value={formData.company}
          required
        />
        <button
          type="submit"
          className="add-and-update-button"
        >
          {user ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  )
}

export default UserForm