
import { createStore } from 'redux';
import salaryReducer from './reducers'; 

const store = createStore(salaryReducer);

export default store;
