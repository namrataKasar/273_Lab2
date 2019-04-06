import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SideBar from '../sideNavigation/SideBar'
import {Grid, Input, Paper} from '@material-ui/core'
import {Redirect} from 'react-router'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as createCourse from '../../actions/courseAction';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  submit: {
    backgroundColor: '#0055a2',
    color: '#fff'
  },
  paperClass:{
    marginTop: 110,
    overflowX: "auto",
    padding: '0% 10% 5%'
  },
});


class CreateCourse extends React.Component {
  state = {
    sjsuID: '', //Logged In user
    is_student: '',
    courseId : '',
    courseName : '',
    courseDept : '',
    courseDescription : '',
    courseRoom : '',
    courseCapacity : '',
    waitlistCapacity : '',
    courseTerm : '',
    enrolledCounter : '',
    errorMsg : '',
    successMsg : '',

    };

  componentWillMount = () => {

    const data = {
      sjsuID : window.sessionStorage.getItem('sjsuID'),
      is_student : window.sessionStorage.getItem('is_student')
    }
    this.setState({
      sjsuID : data.sjsuID,
      is_student : data.is_student
    })
  }

  handleChange = name => event => {
    this.setState({
      errorMsg: '',
      successMsg: ''
    })
    this.setState({ [name]: event.target.value });
  };

  createCourse = (e) => {
    e.preventDefault();

    if(this.state.courseId == '' || this.state.courseName == '' || this.state.courseDept == '')
    {
      console.log("Empty");
      this.setState({
        errorMsg: "Please enter details marked with * to create course!",
        successMsg: ''
      })
    }
    else
    {
      this.setState({
        errorMsg: '',
        successMsg: ''
      })
      const data = this.state;
      console.log("In Create Course")
      // let propsData = this.props.courseData.LoginReducer.LoginReducer;
      // console.log(propsData);
      
      this.props.createCourse(data)
      .then(response => {
          const newData = this.props.courseData.LoginReducer.LoginReducer;
          console.log(newData);
          if(newData.message === "Course with this ID already exists")
          {
              this.setState({
                  errorMsg : newData.message
              })
          }
          else if(newData.courses !== "")
          {
            this.setState({
                successMsg: newData.message,
                courseId : '',
                courseName : '',
                courseDept : '',
                courseDescription : '',
                courseRoom : '',
                courseCapacity : '',
                waitlistCapacity : '',
                courseTerm : '',
                errorMsg : '',
            })
          }
          
      })
      .catch(error => {
          console.log(error);
      })
    }
    
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="dashboard-layout">
          {this.state.redirectVar}
          <Grid container spacing={16}>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={5}>
                    <div style={{position:'absolute'}}>
                        <h1 className="dashboard-title">Create Course</h1>
                    </div>
                    <Paper className={classes.paperClass}>
                    <div style={{position: "relative", marginTop:'40px', display: 'block'}}>
                        <form className={classes.container} onSubmit={this.createCourse}>

                            <label style={{color:'red'}}>{this.state.errorMsg}</label>
                            <label style={{color:'green'}}>{this.state.successMsg}</label>
                            <TextField
                            id="courseId"
                            label="Course Id"
                            fullWidth
                            value={this.state.courseId}
                            onChange={this.handleChange('courseId')}
                            margin="normal"
                            required
                            />

                            <TextField
                            id="courseName"
                            label="Course Name"
                            value={this.state.courseName}
                            fullWidth
                            onChange={this.handleChange('courseName')}
                            margin="normal"
                            required
                            />

                            <TextField
                            id="courseDept"
                            label="Course Department"
                            value={this.state.courseDept}
                            fullWidth
                            onChange={this.handleChange('courseDept')}
                            margin="normal"
                            required
                            />

                            <TextField
                            id="courseDescription"
                            label="Course Description"
                            value={this.state.courseDescription}
                            fullWidth
                            onChange={this.handleChange('courseDescription')}
                            margin="normal"
                            />

                            <TextField
                            id="courseRoom"
                            label="Course Room"
                            value={this.state.courseRoom}
                            fullWidth
                            onChange={this.handleChange('courseRoom')}
                            margin="normal"
                            />

                            <TextField
                            id="courseTerm"
                            label="Course Term"
                            value={this.state.courseTerm}
                            fullWidth
                            onChange={this.handleChange('courseTerm')}
                            margin="normal"
                            />

                            <TextField
                            id="courseCapacity"
                            label="Course Capacity"
                            value={this.state.courseCapacity}
                            fullWidth
                            onChange={this.handleChange('courseCapacity')}
                            margin="normal"
                            />

                            <TextField
                            id="waitlistCapacity"
                            label="Waitlist Capacity"
                            value={this.state.waitlistCapacity}
                            fullWidth
                            onChange={this.handleChange('waitlistCapacity')}
                            margin="normal"
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Create Course
                            </Button>
                        </form>  
                    </div>
                      </Paper>
                    
                </Grid>
            </Grid>

         

        
      </div>
    );
  }
}

CreateCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {

    return {
        courseData : state
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(createCourse, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCourse));