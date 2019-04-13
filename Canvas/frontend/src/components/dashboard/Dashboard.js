import React from 'react';
import Card from '../commons/Card'
import SideBar from '../sideNavigation/SideBar';
import { Grid, Typography} from '@material-ui/core';
import Axios from 'axios';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as getData from '../../actions/enrollmentAction'

// import Draggable from 'react-draggable';

class Dashboard extends React.Component {
    state={
        sjsuID : '', //logged in user
        rows : '',
        is_student : '',
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
        redirectVar: null,
        username: '',
        initials: ''

    }

    componentWillReceiveProps(nextProps){
      console.log("Dashboard nextprops");

      console.log(nextProps);

      const data = {
        sjsuID : window.sessionStorage.getItem("sjsuID"),
        is_student: window.sessionStorage.getItem("is_student")
      }

      this.props.enrolledCourses(data)
      .then(response => {
        const propsData = nextProps.userData.LoginReducer.LoginReducer
        if(nextProps.userData){
            this.setState ({
                sjsuID: propsData.sjsuID,
                fName: propsData.fName,
                lName: propsData.lName,
                phoneNo: propsData.phoneNo,
                city: propsData.city,
                country: propsData.country,
                company: propsData.company,
                school: propsData.school,
                hometown: propsData.hometown,
                language: propsData.language,
                gender: propsData.gender,
                aboutMe: propsData.aboutMe,
                profilePic: propsData.profilePic,
                email: propsData.email,
                is_student: propsData.is_student,
                rows: propsData.courses
            })
          }
      })
      .catch(error => {
        console.log(error);
      })
      
  }

    componentWillMount = () => {

        console.log(this.props.userData);

        const propsData = this.props.userData.LoginReducer.LoginReducer;
        
        window.sessionStorage.setItem("sjsuID",propsData.sjsuID);
        window.sessionStorage.setItem("is_student",propsData.is_student);
       
        this.setState({
          sjsuID: propsData.sjsuID,
          fName: propsData.fName,
          lName: propsData.lName,
          phoneNo: propsData.phoneNo,
          city: propsData.city,
          country: propsData.country,
          company: propsData.company,
          school: propsData.school,
          hometown: propsData.hometown,
          language: propsData.language,
          gender: propsData.gender,
          aboutMe: propsData.aboutMe,
          profilePic: propsData.profilePic,
          email: propsData.email,
          is_student: propsData.is_student,
          rows: propsData.courses
        })
      }

    render(){        
        var elements=[];
        let rows = this.props.userData.LoginReducer.LoginReducer.courses;
        console.log(rows);
        for(var i=0;i<rows.length;i++){
        elements.push(<Card key={i} value={rows[i]} />);
        }
        let message = ''; 
        if(rows.length == 0)
        {
          message = "You have not enrolled for any course!!!";
        }
        return(
                <div className="dashboard-layout">
                
                    <Grid container spacing={16}>
                        <Grid item xs={2}>
                          <SideBar/>
                        </Grid>
                        <Grid item xs={10}>
                            <div style={{position:'absolute'}}>
                                <h1 className="dashboard-title">DashBoard</h1>
                            </div>
                            <div style={{position: "relative", marginTop:'100px', display: 'block'}}>
                                  <Typography variant="h6" style={{color: '#008ee2'}} noWrap>
                                      {message}
                                  </Typography>
                                  
                                    {elements}
                                  
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )

    }
}

const mapStateToProps = (state) => {
  return{
      userData : state
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);