import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import CourseReducer from './CourseReducer';
import AssignmentReducer from './AssignmentReducer';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    LoginReducer, CourseReducer, AssignmentReducer
})

const allReducers = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root');
        state = undefined;
      }
    
    return rootReducer(state, action);
}

export default allReducers;