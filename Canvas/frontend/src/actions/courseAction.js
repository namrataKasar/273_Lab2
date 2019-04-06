import axios from 'axios/index';

export function userInfo(values) {
    return { 
        type: "USER_INFO", 
        payload : values
    }
  };

export const createCourse = (data) => {
    console.log(data);
    return dispatch => {
        return axios.post('/course/create', {data})
        .then(response => {
            console.log(response);
            dispatch(userInfo(response.data));
        })
    }
}

export const searchCourses = (data) => {
    console.log(data);

    return dispatch => {
        if(data.showByName)
        {
            return axios.post('/course/search/name', {data});
            //No need to save search results of course into state;
        } 
        else if(data.showByTerm)
        {
            return axios.post('/course/search/term', {data});
        }
        else if(data.showByID)
        {
            return axios.post('/course/search/id', {data});
        }
    }
}

