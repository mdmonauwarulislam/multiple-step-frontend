import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import stepReducer from './slice/stepSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        step: stepReducer,
    },
});
