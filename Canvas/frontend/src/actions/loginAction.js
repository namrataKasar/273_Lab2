import axios from "axios/index";

export function loginInfo(values) {
    return { 
        type: "LOGIN_INFO", 
        payload : values
    }
  };

export function userInfo(values){
    return{
        type:"USER_INFO",
        payload:values
    }
}

export function logOut(values){
    return{
        type:"USER_LOGOUT",
        payload:values
    }
}

export function userLogin(data){
    return dispatch => {
        return axios.post('/login',{data}).then((response)=>{
            console.log(response.data);
            dispatch(loginInfo(response.data));
        });
    }
}

export function getUserDetails(data){
    return dispatch => {
        return axios.post('/user/details',{data})
        .then((response)=>{
            console.log(response.data.user);
            dispatch(userInfo(response.data.user));
        });
    }
}

export function updateUserDetails(data){
    return dispatch => {
        return axios.put('/user/update',{data}).then((response)=>{
            console.log(response.data);
            dispatch(userInfo(response.data));
        });
    }
}

export function userSignup(data){
    console.log(data);
    return dispatch => {
        return axios.post('/signup', {data});
    }
}

export const userLogout = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/logout',{data}).then((response)=>{
            dispatch(logOut(response.data));
        });
    }
}

export function courseInfo(values) {
    return { 
        type: "COURSE_INFO", 
        payload : values
    }
  };

export const getCourseDetails = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/course/details', {data})
        .then(response => {
            console.log(response);
            dispatch(courseInfo(response.data.course));
        })
    }
}
