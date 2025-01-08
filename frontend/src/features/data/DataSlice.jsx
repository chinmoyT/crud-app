import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

export const DataSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        adduser: (state, action)=> {
            state.users.push(action.payload)
        },
        edituser: (state, action)=> {
            const ind = state.users.findIndex(user=> user.id === action.payload.id)
            if(ind != -1){
                state.users[ind] = action.payload
            }
        },
        deleteuser: (state, action)=> {
            const requiredUsers = state.users.filter(user => user.id !== action.payload)
            state.users = requiredUsers
        },
        setUsers: (state, action)=> {
            state.users = action.payload
        }
    }
})

export const {adduser, edituser, deleteuser} = DataSlice.actions
export default DataSlice.reducer