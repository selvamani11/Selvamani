import { createStore } from 'redux';
import abacusReducer from '../reducers/reducers';

const store = createStore(abacusReducer);

export default store;
