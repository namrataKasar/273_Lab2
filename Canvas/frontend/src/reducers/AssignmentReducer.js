import {combineReducers} from 'redux';

const initialState = {
    asignmentTitle: '',
    dueDate : '',
    totalPoints : '',
    fileUploaded : '',
}

const AssignmentReducer = (state = initialState, action) => {

    // switch(action.type)
    // {
    //     case "ASSIGNMENT_INFO" : console.log(action.payload);
    //                             state = {
    //                                 ...state,
    //                                 asignmentTitle : action.payload.TITLE,
    //                                 dueDate : action.payload.DUE_DATE,
    //                                 totalPoints : action.payload.TOTAL_POINTS,
    //                                 fileUploaded : action.payload.FILE_PATH
    //                             }
    //                             break; 
        
    // }
    return state;

}


export default combineReducers({
    AssignmentReducer
});