import {configureStore} from '@reduxjs/toolkit'
import  DataSlice  from '../features/data/DataSlice'

export const Store = configureStore({
    reducer: {
        users: DataSlice 
    }
})