import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {Typography, Button, Paper, TextField} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import * as announcementInfo from '../../actions/courseHomeAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Axios from 'axios';

const styles = theme => ({
    root: {
        boxShadow: 'none',
        width: '100%',
        marginTop: theme.spacing.unit * 10,
    //   backgroundColor: '#f0f0f0',
    //   padding: '32px',
    //   border: '0.5px solid black'
  },
  nested: {
      paddingLeft: theme.spacing.unit * 4,
      paddingRight: theme.spacing.unit * 4,
    },
  bgPaper: {
      padding: '4px',
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    listItemText: {
      margin: '16px'
    },
    divider: {
      border: '0.5px solid black'
    },
    textHidden: {
      width: "600px",
    },
    textColor1:{
    color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 10% 5%'
  },
  button: {
    margin: theme.spacing.unit * 4 ,
  },
  fullWidth: {
    width: '100%',
    float: 'left'
  }
  });

class Announcements extends Component {

  state = {
    sjsuID : '',
    is_student : '',
    courseId : '',
    title : '',
    description : '',
    timeCreated : '',
    errorMessage : '',
    notifications : ''
  }

  handleChange = name => e => {
    this.setState({
     [name] : e.target.value,
     errorMessage : ''
    })
 }

 componentWillMount = () => {

  let propsData = this.props.announcementInfo.CourseReducer.CourseReducer;
  const userData = this.props.announcementInfo.LoginReducer.LoginReducer;
  console.log(propsData.courseId);
  if(propsData && userData)
  {
        const data = {
          courseId : propsData.courseId,
          courseName : propsData.courseName,
          sjsuID : userData.sjsuID,
          is_student : userData.is_student
      }

      this.props.getAnnouncements(data)
      .then(response => {
        propsData = this.props.announcementInfo.CourseReducer.CourseReducer;
        this.setState({
          courseId : data.courseId,
          courseName : data.courseName,
          sjsuID : data.sjsuID,
          is_student : data.is_student,
          notifications : propsData.announcements
      })
      })
      
      

  }



 }


 post = (e) => {
    e.preventDefault();
    if(this.state.title === '' || this.state.description === '')
    {
      this.setState({
        errorMessage : 'Please enter title and description of the Announcement.'
      })
    }
    else
    {
      const data = this.state;
      this.props.postAnnouncement(data)
      .then(response => {
        console.log(this.props.announcementInfo);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  render() {
    const { classes } = this.props;
    const header = 'Announcements';
    const is_student = window.sessionStorage.getItem('is_student');


    return (
      <div style={{marginTop: '64px'}}>
      <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                {header}
            </Typography>
            {/* <Button variant="contained" color="primary" className={classes.button}
            component={Link} to='/course/announcements/create'
            style={{ display : is_student === "true" ? 'none' : 'inline-flex' }}>
              
              Announcement
            </Button> */}
        </div>
      
        <Paper className={classes.paperClass}
        style={{ display : is_student === "true" ? 'none' : 'block' }}>
                    <form className={classes.container} onSubmit={this.post}>
                        <div className={classes.fullWidth}>
                          <label style={{color:'red'}}>{this.state.errorMessage}</label>
                        </div>
                        <div>
                          <TextField
                            id="title"
                            label="Title"
                            className={classes.fullWidth}
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                            >
                          </TextField>
                        </div>
                        <div>
                          <TextField
                          id="description"
                          label="Description"
                          multiline
                          rows="4"
                          className={classes.fullWidth}
                          value={this.state.description}
                          onChange={this.handleChange('description')}
                          margin="normal"
                          >
                          </TextField>
                        </div>

                        <div>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                            >
                            Post Announcement
                            </Button>
                        </div>
                    </form>
                </Paper>
      
      <Paper className={classes.paperClass}
      style={{ display : this.state.notifications.length > 0 ? 'block' : 'none' }}>
      
        {Object.keys(this.state.notifications).map((text, index) => (
        <div>                
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.bgPaper}
            >
                <Grid item xs={1}>
                <Avatar alt="Remy Sharp"  className={classes.profileImg} src="http://localhost:3001/profileImages/Jerry.jpg"></Avatar>
                </Grid>
                <Grid
                item xs={9}
                container
                direction="column"
                justify="center"
                width='100%'
                className={classes.bgPaper}
                >
                    <Typography variant="h6" gutterBottom> {this.state.notifications[text].TITLE} </Typography>
                    <Typography noWrap className={classes.textHidden} variant="subheading" > 
                    {this.state.notifications[text].DESCRIPTION}
                    </Typography>
                </Grid>
                
                <Grid
                item xs={2}
                container
                direction="column"
                justify="center"
                className={classes.bgPaper}
                >
                    <Typography variant="subtitle1" > Posted On </Typography>
                    <Typography> {this.state.notifications[text].POSTED_DATE} </Typography>
                </Grid>
                
            </Grid>

            <Divider className={classes.divider}/>
        </div>

        ))}
      </Paper>
      
      </div>
    );
  }
}

Announcements.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
    return{
        announcementInfo : state
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(announcementInfo,dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Announcements));