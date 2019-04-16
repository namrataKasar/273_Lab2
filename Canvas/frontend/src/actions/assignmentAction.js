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
  
export function assignmentFileInfo(values) {
    return { 
        type: "ASSIGN_FILE", 
        payload : values
    }
};

export function gradesInfo(values) {
    return { 
        type: "GRADES", 
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

export const getSubmissions = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/assignment/getSubmissions', {data})
        .then(response => {
            console.log(response);
            // dispatch(submitAssignmentInfo(response.data.user));
        })
    }
}

export const submitGrades = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/assignment/submitGrades', {data})
        .then(response => {
            console.log(response);
            dispatch(gradesInfo(response.data));
        })
    }
}

//upload Assignment
export function uploadAssignment(data){
    return dispatch => {
        console.log(data.get('courseId'));
        return axios.post('/assignment/upload', data
        , {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'courseId': data.get('courseId')
            }
        }
        )
        .then(response => {
            console.log(response);
            dispatch(assignmentFileInfo(response.data));
        })
    }
}

//Submit Assignment
export function uploadSubmission(data){
    return dispatch => {
        console.log(data.get('courseId'));
        return axios.post('/assignment/submission/upload', data
        , {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'courseId': data.get('courseId'),
                'assignmentId': data.get('assignmentId'),
                'studentID': data.get('sjsuID')
            }
        }
        )
        .then(response => {
            console.log(response);
            dispatch(assignmentFileInfo(response.data));
        })
    }
}