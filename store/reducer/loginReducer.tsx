import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loginInput: {
            _id: '',
            name: '',
            email: '',
            password: '',
        }
    },
    reducers: {
        setData: (state, action) => {
            state.loginInput = { ...state.loginInput, ...action.payload }
        },
        resetData: (state) => {
            state.loginInput = {
                _id: '',
                name: '',
                email: '',
                password: '',
            }
        }
    }
})

export const { setData, resetData } = loginSlice.actions
export default loginSlice.reducer