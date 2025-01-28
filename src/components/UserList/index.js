import { useEffect, useState } from 'react'

import { TailSpin } from 'react-loader-spinner'

import Popup from 'reactjs-popup'

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import './index.css'
import UserForm from '../UserForm';


const UserList = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const apiUrl = "https://jsonplaceholder.typicode.com/users"
                const options = {
                    method: 'GET'
                }
                const response = await fetch(apiUrl, options)
                const data = await response.json()

                setUsers(data)
                setIsLoading(false)

            } catch (error) {
                setError("Error occured while Fetching Users")
                console.log(error)
            }
        }

        getUsersData()

    }, [])

    const onClickDeleteUser = async (userId) => {
        console.log(userId)
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`
        const options = {
            method: 'DELETE'
        }

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
            } else {
                console.log("Failed to delete user. Please try again.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const openPopup = (user = null) => {
        setSelectedUser(user)
        setIsPopupOpen(true)
    }

    const closePopup = () => {
        setSelectedUser(null)
        setIsPopupOpen(false)
    }

    return (
        <div className="user-list-main-container">
            <button type="button" className="add-user-btn" onClick={() => openPopup()}>Add User</button>
            {error && <div className='error-msg'>{error}</div>}
            {isLoading ? (
                <div className='loader-container'>
                    <TailSpin type="TailSpin" color="#2657eb" height={50} width={50} />
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(eachUser => (
                            <tr key={eachUser.id}>
                                <td>{eachUser.id}</td>
                                <td>{eachUser.name.split(' ')[0]}</td>
                                <td>{eachUser.name.split(' ')[1]}</td>
                                <td>{eachUser.email}</td>
                                <td>{eachUser.company.name}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="action-button"
                                        onClick={() => openPopup(eachUser)}
                                    >
                                        <FaRegEdit className="edit-button-icon" />
                                    </button>
                                    <button
                                        type="button"
                                        className="action-button"
                                        onClick={() => onClickDeleteUser(eachUser.id)}
                                    >
                                        <MdDelete className="delete-button-icon" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* when Popup is true  */}
            <Popup modal open={isPopupOpen} onClose={closePopup} closeOnDocumentClick>
                {close => (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <button
                                type="button"
                                className="close-popup"
                                onClick={() => close()}
                            >
                                X
                            </button>
                            <UserForm
                                user={selectedUser}
                                setUsers={setUsers}
                                users={users}
                                setIsPopupOpen={setIsPopupOpen}
                                setSelectedUser={setSelectedUser}
                            />
                        </div>
                    </div>
                )}
            </Popup>

        </div>
    )
}

export default UserList