import { configureStore } from '@reduxjs/toolkit'

import {creditsReducer} from './slices/credit'

const store = configureStore({
    reducer: {
        credits: creditsReducer,
    }
})

export default store;