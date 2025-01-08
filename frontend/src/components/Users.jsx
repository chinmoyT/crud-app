import React, { useState } from 'react'
import Delete from '../assets/delete.png'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase_config'
import { useDispatch, useSelector } from 'react-redux'
import { adduser, edituser, deleteuser } from '../features/data/DataSlice'

const Users = () => {
    const [data, setData] = useState({ name: '', age: '', dob: '', address: '' })
    const [modal, setModal] = useState(false)
    const [updateUser, setUpdateUser] = useState(null)
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    const handleLogout = async () => {
        await signOut(auth);
    };

    const handleAddUserForm = () => {
        setModal(!modal)
    }

    const addUser = async (e) => {
        e.preventDefault()
        const newUser = { ...data, id: Date.now().toString() }
        dispatch(adduser(newUser))
        setData({ name: '', age: '', dob: '', address: '' })
        setModal(false)
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

    }

    const handleEditUser = (u) => {
        setUpdateUser(u)
        setData(u)
        setModal(!modal)
    }

    const EditUser = async (e) => {
        e.preventDefault()
        dispatch(dispatch(edituser({...data, id: updateUser.id})))
        setUpdateUser(null)
        setData({ name: '', age: '', dob: '', address: '' })
        setModal(false)
    }

    const handleCancel = () => {
        setUpdateUser(null)
        setData({ name: '', age: '', dob: '', address: '' })
        setModal(false)
    }

    const handledeleteUser = (id) => {
        dispatch(deleteuser(id))
    }

    return (
        <div className='container-fluid'>
            <div className='d-flex flex-row-reverse p-3'>
                <button onClick={handleLogout} className='m-2'>Sign out</button>
            </div>
            <div className='table-responsive'>
                {users.length ? <table className='table table-borderless table-hover min-vw-50'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Age</th>
                            <th scope="col">Address</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.dob}</td>
                                <td>{u.age}</td>
                                <td>{u.address}</td>
                                <td>
                                    <button onClick={() => handleEditUser(u)}>Edit</button>
                                </td>
                                <td><img src={Delete} style={{ cursor: 'pointer', width: '40px', height: "40px" }} onClick={() => handledeleteUser(u.id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <h2>No user found!!</h2>}
            </div>
            <div>
                <button type="button" className="btn btn-secondary" onClick={handleAddUserForm} hidden={modal}>{modal ? "" : "Add"}</button>
            </div>
            {modal && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "2px"
                    }}
                >
                    <form
                        onSubmit={updateUser ? EditUser : addUser}
                        style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            padding: "2rem",
                            borderRadius: "8px",
                            maxWidth: '600px'
                        }}
                    >
                        <h3 className="mt-3 text-center">
                            {updateUser ? "Edit User" : "Add User"}
                        </h3>
                        <div className="form-floating mb-3 mt-3">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="Name"
                                placeholder="Name"
                                value={data.name}
                                onChange={handleFormChange}
                                required={"true"}
                            />
                            <label htmlFor="Name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                id="DOB"
                                className="form-control"
                                name="dob"
                                placeholder="Date of Birth"
                                value={data.dob}
                                onChange={handleFormChange}
                                required={"true"}
                            />
                            <label htmlFor="DOB">Date of Birth</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                id="Age"
                                placeholder="Age"
                                name="age"
                                className="form-control"
                                value={data.age}
                                onChange={handleFormChange}
                                required={"true"}
                            />
                            <label htmlFor="Age">Age</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="Address"
                                placeholder="Address"
                                name="address"
                                className="form-control"
                                value={data.address}
                                onChange={handleFormChange}
                                required={"true"}
                            />
                            <label htmlFor="Address">Address</label>
                        </div>
                        <div className="text-center">
                            <button
                                className="btn btn-dark"
                                type="submit"
                                style={{ marginRight: "5px" }}
                            >
                                Submit
                            </button>
                            <button className="btn btn-dark" type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )
}

export default Users
