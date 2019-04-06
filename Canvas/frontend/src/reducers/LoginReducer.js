import {combineReducers} from 'redux';

const initialState = {
    sjsuID : '',
    password : '',
    is_student: '',
    fName: '',
    lName: '',
    phoneNo: '',
    city: '',
    country: '',
    company: '',
    school: '',
    hometown: '',
    language: '',
    gender: '',
    aboutMe: '',
    profilePic: '',
    email: '',
    token: '',
    message: '',
}

const LoginReducer = (state = initialState, action) => {

    switch(action.type)
    {
        case "USER_INFO" :  console.log("User Payload");
                            console.log(action);
                            if(action.payload)
                            {
                                state = {
                                    ...state,
                                    sjsuID : action.payload.SJSU_ID,
                                    passsword : action.payload.PASSWORD,
                                    is_student: action.payload.IS_STUDENT,
                                    fName: action.payload.FNAME,
                                    lName: action.payload.LNAME,
                                    phoneNo: action.payload.PHONE_NO,
                                    city: action.payload.CITY,
                                    country: action.payload.COUNTRY,
                                    company: action.payload.COMPANY,
                                    school: action.payload.SCHOOL,
                                    hometown: action.payload.HOMETOWN,
                                    language: action.payload.LANGUAGE,
                                    gender: action.payload.GENDER,
                                    aboutMe: action.payload.ABOUT_ME,
                                    profilePic: action.payload.PROFILE_PIC,
                                    email: action.payload.EMAIL,
                                    message: action.payload.message
                                }
                            }
                            else if(action.payload.code === "ERR_DUP_ENTRY")
                            {
                                state = {
                                    ...state,
                                    message : action.payload.message,
                                }
                            }
                            break;
                    
        case "LOGIN_INFO" : console.log(action.payload.user.COURSES);
                            state = {
                                ...state,
                                token: action.payload.token,
                                sjsuID : action.payload.user.SJSU_ID,
                                is_student: action.payload.user.IS_STUDENT,
                                fName: action.payload.user.FNAME,
                                lName: action.payload.user.LNAME,
                                phoneNo: action.payload.user.PHONE_NO,
                                city: action.payload.user.CITY,
                                country: action.payload.user.COUNTRY,
                                company: action.payload.user.COMPANY,
                                school: action.payload.user.SCHOOL,
                                hometown: action.payload.user.HOMETOWN,
                                language: action.payload.user.LANGUAGE,
                                gender: action.payload.user.GENDER,
                                aboutMe: action.payload.user.ABOUT_ME,
                                profilePic: action.payload.user.PROFILE_PIC,
                                email: action.payload.user.EMAIL,
                                courses: action.payload.user.COURSES
                            }
                            break;

            
        
    }
    return state;

}


export default combineReducers({
    LoginReducer
});