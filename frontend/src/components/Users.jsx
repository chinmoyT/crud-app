import React, { useEffect, useState } from 'react'
import { url } from '../Url'
import axios from 'axios'
import Delete from '../assets/delete.png'

const Users = () => {
    const [user, setUser] = useState([])
    const [data, setData] = useState({ name: '', age: '', dob: '', address: '' })
    const [showAddUser, setShowAddUser] = useState(false)
    const [updateUser, setUpdateUser] = useState(null)

    const getUsers = async () => {
        try {
            const response = await axios.get(`${url}/users`)
            setUser(response.data)
        }
        catch (err) {
            console.log('Fetching erropr', err)
        }

    }
    useEffect(() => {
        getUsers()
    }, [])

    const handleAddUserForm = () => {
        setShowAddUser(!showAddUser)
    }

    const addUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${url}/users`, data)
            setUser([...user, response.data])
            setData({ name: '', age: '', dob: '', address: '' })
            setShowAddUser(false)
            await getUsers()
        }
        catch (err) {
            console.log('Error adding user', err)
        }
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        
    }

    const handleEditUser = (user) => {
        setUpdateUser(user)
        setData({
            name: user.name,
            age: user.age,
            dob: user.dob,
            address: user.address
        })
        setShowAddUser(!showAddUser)
    }

    const EditUser = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${url}/users/${updateUser._id}`, data)
            setUser(user.map(u => (u.id === updateUser.id ? { ...u, ...data } : u)))
            setUpdateUser(null)
            setData({ name: '', age: '', dob: '', address: '' })
            setShowAddUser(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCancel = ()=> {
        setUpdateUser(null)
        setData({name: '',age: '', dob: '', address: ''})
        setShowAddUser(false)
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${url}/users/${id}`)
            setUser(user.filter((u) => u._id != id))
        }
        catch (err) {
            console.log('Error deleting user', err)
        }
    }

    return (
        <div className='container-fluid'>
            <table className='table table-borderless table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.dob}</td>
                            <td>{u.age}</td>
                            <td>{u.address}</td>
                            <td>
                                <button onClick={() => handleEditUser(u)}>Edit</button>
                            </td>
                            <td><img src={Delete} style={{cursor:'pointer',width: '40px', height: "40px"}} onClick={()=> deleteUser(u._id)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button type="button" className="btn btn-secondary" onClick={handleAddUserForm}>Add</button>
            </div>
            {showAddUser && (
                <div>
                    <form onSubmit={updateUser ? EditUser : addUser }>  
                        <h3 className='mt-3'>{updateUser? 'Edit User' : 'Add User'}</h3>
                        <div className='form-floating mb-3 mt-3'>
                            <input type="text" className='form-control' name='name' id='Name' placeholder='Name' value={data.name} onChange={handleFormChange} />
                            <label htmlFor="Name">Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type="date" id="DOB" className='form-control' name='dob' placeholder='Date of Birth' value={data.dob} onChange={handleFormChange} />
                            <label htmlFor="DOB">Date of Birth</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type="number" id="Age" placeholder='Age' name='age' className='form-control' value={data.age} onChange={handleFormChange} />
                            <label htmlFor="Age">Age</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type="text" id="Address" placeholder='Address' name='address' className='form-control' value={data.address} onChange={handleFormChange} />
                            <label htmlFor="Address">Address</label>
                        </div>
                        <button className='btn btn-dark' type='submit' style={{marginRight:"5px"}}>Submit</button>
                        <button className='btn btn-dark' type='button' onClick={handleCancel} >Cancel</button>
                    </form>
                </div>
            )}

        </div>
    )
}

export default Users