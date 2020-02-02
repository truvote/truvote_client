import { combineReducers } from 'redux';
import users from './users';
import currentUser from './auth';
import bills from './bills';


export default combineReducers({ bills });