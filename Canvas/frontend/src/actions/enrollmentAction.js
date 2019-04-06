import axios from 'axios/index';

export function studentInfo(values){
    console.log("Pauyodsd")
    return{
        type:"USER_INFO",
        payload:values
    }
}

export function courseInfo(values){
    return{
        type:"COURSE_STUDENTS",
        payload:values
    }
}

export const enrolForCourse = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/courses/add',{data})
        .then(response => {
            console.log(response);
            dispatch(studentInfo(response.data.user));
        })
    }
}

export const enrolledCourses = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/getEnrolledCourses',{data})
        .then(response => {
            console.log(response);
            dispatch(studentInfo(response.data.user));
        })
    }
}


export const deleteCourse = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/courses/delete',{data})
        // .then(response => {
        //     console.log(response);
        //     dispatch(studentInfo(response.data));
        // })
    }
}

export const getEnrolledStudents = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/getStudentsByCourse',{data})
        .then(response => {
            console.log(response);
            dispatch(courseInfo(response.data.course));
        })
    }
}