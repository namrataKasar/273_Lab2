import axios from 'axios/index';

export function assignmentInfo(values) {
    return { 
        type: "ASSIGNMENT_INFO", 
        payload : values
    }
  };

export function submitAssignmentInfo(values) {
    return { 
        type: "ASSIGN_SUB", 
        payload : values
    }
  };


export const createAssignment = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/assignment/create', {data})
        .then(response => {
            console.log(response);
            dispatch(assignmentInfo(response.data.course));
        })
    }
}

export const getAssignment = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/course/getAssignments', {data})
        .then(response => {
            console.log(response);
            dispatch(assignmentInfo(response.data.course));
        })
    }
}

export const submitAssignment = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/assignment/submit', {data})
        .then(response => {
            console.log(response);
            dispatch(submitAssignmentInfo(response.data.user));
        })
    }
}