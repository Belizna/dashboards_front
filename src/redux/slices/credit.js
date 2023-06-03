import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const getPayments = createAsyncThunk('credit/payment', async () => {
    const payments = await axios.get(`${process.env.REACT_APP_API_URL}credit/payments`)
    return payments;
})

const initialState = {
    earlyPayments : [],
    chartsCredit: [],
    payments : {
        items: [],
        status: 'loading',
    },
}

const creditsSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {},
    extraReducers: {
        [getPayments.pending] : (state) => {
            state.payments.items = [];
            state.payments.status = 'loading'
        },
        [getPayments.fulfilled] : (state,action) => {
            state.payments.items = action.payload;
            state.payments.status = 'loaded';
        },
        [getPayments.rejected] : (state) => {
            state.payments.items = [];
            state.payments.status = 'error';
        }
    }
})

export const creditsReducer = creditsSlice.reducer