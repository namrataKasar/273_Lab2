import axios from 'axios/index';

export function courseInfo(values) {
    return { 
        type: "COURSE_INFO", 
        payload : values
    }
  };

// export const getCourseDetails = (data) => {
//     console.log(data);
//     return dispatch => {
//         return axios.post('/course/details', {data})
//         .then(response => {
//             console.log(response);
//             dispatch(courseInfo(response.data.course));
//         })
//     }
// }

export const postAnnouncement = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/announcement/create', {data})
        .then(response => {
            console.log(response);
            dispatch(courseInfo(response.data.updatedCourse));
        })
    }
}

//get announcements
export const getAnnouncements = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/getAnnouncements', {data})
        .then(response => {
            console.log(response);
            dispatch(courseInfo(response.data.course));
        })
    }
}
