import {combineReducers} from 'redux';

const initialState = {
    courseId: '',
    courseName: '',
    createdBy: '',
    studentsEnrolled: '',
    sjsuID : '',
    fName: '',
    lName: '',
    profilePic: '',
    token: '',
    announcements: ''
}

const CourseReducer = (state = initialState, action) => {

    switch(action.type)
    {
        case "COURSE_STUDENTS" :  console.log("User Payload");
                            console.log(action.payload);
                            state = {
                                ...state,
                                courseId : action.payload.COURSE_ID,
                                courseName : action.payload.COURSE_NAME,
                                studentsEnrolled : action.payload.STUDENTS_ENROLLED
                            }
                            break;  
 
        case "COURSE_INFO" : console.log(action.payload);
                                state = {
                                    ...state,
                                    courseId : action.payload.COURSE_ID,
                                    courseName : action.payload.COURSE_NAME,
                                    createdBy : action.payload.CREATED_BY,
                                    announcements : action.payload.ANNOUNCEMENTS
                                }
                                break; 
        
    }
    return state;

}


export default combineReducers({
    CourseReducer
});