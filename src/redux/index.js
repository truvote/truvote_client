import { combineReducers } from 'redux';
import users from './users';
// import stories from './stories';
import currentUser from './auth';
​
export default combineReducers({ users, currentUser });
