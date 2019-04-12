import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SideBar from './sideNavigation/SideBar'
import {Grid, Input, Paper} from '@material-ui/core'
import {Redirect} from 'react-router'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseData from '../actions/loginAction'

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


class AddCode extends React.Component {
  state = {
    sjsuID: '', //Logged In user
    is_student: '',
    courseId : '',
    randomNumber : '',
    errorMsg : '',
    successMsg : '',

    };

  componentWillMount = () => {
    //console.log(this.props.location.state);
    const data = {
      sjsuID : window.sessionStorage.getItem('sjsuID'),
      is_student : window.sessionStorage.getItem('is_student'),
      courseId : window.sessionStorage.getItem('courseId'),
    }
    this.setState({
      sjsuID : data.sjsuID,
      is_student : data.is_student,
      courseId : data.courseId
    })
  }

  handleChange = name => event => {
    this.setState({
      errorMsg: '',
      successMsg: ''
    })
    this.setState({ [name]: event.target.value });
  };
 

  generateNumber = (e) => {
    e.preventDefault();
    let min = 100000;
    let max = 999999;
    const random = Math.floor(Math.random()*(max-min+1)+min);
    this.setState({
      randomNumber : random
    })
    const data = {
      randomNumber : random,
      sjsuID : this.state.sjsuID,
      courseId : this.state.courseId
    }

    // axios.post('/store/addCode', {data})
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }
  

  render() {
    const { classes } = this.props;
    console.log(this.props);
    let coursesList= [];
    if(this.props.courseData)
    {
      coursesList = this.props.courseData.LoginReducer.LoginReducer.courses;
    }
    // [
    //   {courseId : '255'},
    //   {courseId : '256'},
    //   {courseId : '257'},
    //   {courseId : '258'},
    // ]

    return (
      <div className="dashboard-layout">
          {this.state.redirectVar}
          <Grid container spacing={16}>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={5}>
                    <div style={{position:'absolute'}}>
                        <h1 className="dashboard-title">Generate Permission Code</h1>
                    </div>
                    <Paper className={classes.paperClass}>
                    <div style={{position: "relative", marginTop:'40px', display: 'block'}}>
                        <form className={classes.container} onSubmit={this.generateNumber}>
                            {/* 
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
                            /> */}

                            <TextField
                            id="courseId"
                            select
                            fullWidth
                            value={this.state.courseId}
                            onChange={this.handleChange('courseId')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            helperText="Please select Course ID to generate Add Code."
                            margin="normal"
                            >
                            {Object.keys(coursesList).map(option => (
                                <option 
                                key={coursesList[option].COURSE_ID} 
                                value={coursesList[option].COURSE_ID}>
                                {coursesList[option].COURSE_ID + " : " + coursesList[option].COURSE_NAME}
                                </option>
                            ))}
                          </TextField>

                            <TextField
                            id="randomNumber"
                            label="Add Code Generated"
                            value={this.state.randomNumber}
                            fullWidth
                            onChange={this.handleChange('randomNumber')}
                            margin="normal"
                            disabled
                            />
                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Generate Persmission Code
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

AddCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    courseData : state
  }
}

const mapDispacthToProps = (dispatch) => {
  return bindActionCreators(courseData, dispatch);
}
export default connect(mapStateToProps, mapDispacthToProps)(withStyles(styles)(AddCode));