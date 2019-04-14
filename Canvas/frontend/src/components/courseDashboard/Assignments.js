import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Typography, Button, Paper, TextField} from '@material-ui/core';
import {connect} from 'react-redux';
import {Redirect} from 'react-router'
import { bindActionCreators } from 'redux';
import {Route} from 'react-router-dom';
import * as assignmentData from '../../actions/assignmentAction';

const styles = theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 884,
//     backgroundColor: '#f0f0f0',
//     padding: '32px',
//     border: '0.5px solid black'
// },
root: {
  boxShadow: 'none',
  width: '100%',
  marginTop: theme.spacing.unit * 5,
},
nested: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
bgPaper: {
    padding: '4px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #D3D3D3'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  listItem: {
    background: 'white',
    border: '1px solid gray',
    margin: '0px',
    padding: '0px'
  },
  listItemText: {
    margin: '16px'
  },
  divider: {
    border: '1px dashed black'
  },
  textColor1 : {
    color: '#008ee2',
  },
  button: {
    margin: theme.spacing.unit * 4 ,
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 10% 5%'
  },
  fullWidth: {
    width: '100%',
    // float: 'left'
  },
  textField: {
      marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 5,
      width: '90%',
        
    },
    textField2: {
        marginLeft: theme.spacing.unit * 3,
        //marginRight: theme.spacing.unit * 3,
        width: '95%',
    },
});

class Assignments extends React.Component {
  
  state = {
    open: false,
    openPast: true,
    createAssignment : '',
    assignmentTitle: '',
    dueDate : '',
    totalPoints : '',
    fileUploaded : '',
    courseId: window.sessionStorage.getItem('courseId'),
    sjsuID: window.sessionStorage.getItem('sjsuID'),
    is_student: window.sessionStorage.getItem('is_student'),
    assignmentsList : '',
    showSubmit : false,
    redirectVar : '', 
  };

  componentWillMount = () => {

    console.log(window.sessionStorage.getItem('is_student'))
    const data = {
      courseId: window.sessionStorage.getItem('courseId'),
      sjsuID: window.sessionStorage.getItem('sjsuID'),
    }

    this.setState({
      is_student: this.props.assignmentData.LoginReducer.LoginReducer.is_student,
      sjsuID: this.props.assignmentData.LoginReducer.LoginReducer.sjsuID,
    })
    console.log(this.props.assignmentData.LoginReducer.LoginReducer.submissions)

    this.props.getAssignment(data)
    .then(response => {
      const propsData = this.props.assignmentData.CourseReducer.CourseReducer;
      console.log(propsData);
      this.setState({
        createAssignment : false,
        assignmentsList:propsData.assignments,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClickPast = () => {
    this.setState(state => ({ openPast: !state.openPast }));
  }
  
  handleChange = name => e => {
    this.setState({
     [name] : e.target.value,
     errorMessage : ''
    })
 }

  showCreate = () => {
    this.setState({
      createAssignment : true
    })
  }

  fileHandler = (e) => {
    //e.preventDefault();
    console.log(e.target.files);
    let file = e.target.files;
    const fd = new FormData();
    fd.append('assignmentFile',file[0], file[0].name);
    fd.append('courseId', this.state.courseId);
    console.log(fd.get('courseId'));

    // const data = {
    //   courseId : this.state.courseId,
    //   formData : fd
    // }

    this.props.uploadAssignment(fd)
    .then(response=> {
      console.log(this.props.assignmentData.CourseReducer.CourseReducer.currentFile);
      this.setState({
        fileUploaded : this.props.assignmentData.CourseReducer.CourseReducer.currentFile
      })
    })

    // this.setState({
    //   fileUploaded: fd,
    // })
    // axios.post('/uploadAssignmentFile', fd)
    // .then((response) => {
    //   console.log("http://localhost:3001/" + response.data.substring(9) + file[0].name);
    //     this.setState({
    //       fileUploaded: "http://localhost:3001/" + response.data.substring(9) + file[0].name
    //     })
         
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }

  submitAssignment = (e, assignment) => {
    e.preventDefault();
    console.log(assignment);
    this.setState({
      redirectVar : <Redirect to={{
                pathname: "/course/assignment/submission",
                state: {
                  assignment : assignment,
                  sjsuID : this.state.sjsuID,
                }}}/>
    })
  }

  viewAssignment = (e, assignment) => {
    e.preventDefault();
    console.log(assignment);
    this.setState({
      redirectVar : <Redirect to={{
                pathname: "/course/assignment/view",
                state: {
                  assignment : assignment,
                  sjsuID : this.state.sjsuID,
                }}}/>
    })
  }

  createAssignment = (e) => {
    e.preventDefault();
    // this.setState({
    //   createAssignment : false
    // })

    const data = this.state;
    this.props.createAssignment(data)
    .then(response => {
      console.log("In assignment response");
        {
          const propsData = this.props.assignmentData.CourseReducer.CourseReducer;
          console.log(propsData);
          this.setState({
            createAssignment : false,
            assignmentsList:propsData.assignments,
          })
        }
      
    })
    
    console.log(data);
  }

  render() {
    const { classes } = this.props;
    const header = "Assignments";
    return (
      <div style={{marginTop: '70px'}}>
    
        {this.state.redirectVar}
        <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                {header}
            </Typography>
            <div 
            style={{display: this.state.is_student ?  'none' : 'block'}}
            >
              <Button type="submit" variant="contained" color="primary" className={classes.button}
              onClick={this.showCreate}
              style={{display: this.state.createAssignment ? 'none' : 'initial'}}>
                Create Assignment
              </Button>
            </div>
        </div>
        <Paper className={classes.paperClass}
        style={{display: this.state.createAssignment ? 'block' : 'none'}}>
            <form className={classes.container} onSubmit={this.createAssignment}>
                        <div className={classes.fullWidth}>
                          <label style={{color:'red'}}>{this.state.errorMessage}</label>
                        </div>
                        <Grid container spacing={12}> 
                         <Grid item xs={12}>
                          <div>
                            <TextField
                              id="assignmentTitle"
                              label="Assignment Title"
                              className={classes.textField2}
                              value={this.state.assignmentTitle}
                              onChange={this.handleChange('assignmentTitle')}
                              margin="normal"
                              required
                              >
                            </TextField>
                          </div>
                          </Grid>
                        </Grid>
                       <Grid container spacing={12}> 
                         <Grid item xs={6}>
                          <div>
                            <TextField
                            id="totalPoints"
                            label="Total Points"
                            className={classes.textField}
                            value={this.state.totalPoints}
                            onChange={this.handleChange('totalPoints')}
                            margin="normal"
                            required
                            >
                            </TextField>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div>
                            <TextField
                            id="dueDate"
                            label="Due Date"
                            type="datetime-local"
                            className={classes.textField}
                            value={this.state.dueDate}
                            onChange={this.handleChange('dueDate')}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            required
                            >
                            </TextField>
                          </div>
                        </Grid>
                       </Grid>

                       <Grid container spacing={12}> 
                         <Grid item xs={6}>
                          <div>
                            <TextField
                              id="fileUploaded"
                              label="Upload File"
                              type="file"
                              className={classes.textField}
                              onChange={this.fileHandler}
                              margin="normal"
                              required
                              >
                            </TextField>
                          </div>
                          </Grid>
                        </Grid>
                        <div>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                            >
                            Create Assignment
                            </Button>
                        </div>
                    </form>
                    <div>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary" 
                            className={classes.button}
                            onClick={() => {
                              console.log("Helosdfs");
                              this.state.createAssignment = false}}
                            >
                            Cancel
                            </Button>
                        </div>
        </Paper>
        <List 
        style={{display: this.state.createAssignment && this.state.assignmentsList.length <= 0 ?  'none' : 'block'}}
        component="nav"
        // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        className={classes.root}
        >
          
          <ListItem button onClick={this.handleClickPast}>
            {this.state.openPast ? <ExpandLess /> : <ExpandMore />}
            
            <Typography variant="h6" gutterBottom> 
              <strong>Assignments</strong>
            </Typography>
            
          </ListItem>
          <Collapse in={this.state.openPast} timeout="auto" unmountOnExit className={classes.listItemText}>
                
                    {/* {[['Lab11', 'date', 'time', 'points'], ['Lab12', 'date', 'time', 'points'], ['Lab13', 'date', 'time', 'points'], ['Lab14', 'date', 'time', 'points'] ].map((text, index) => ( */}
                      {Object.keys(this.state.assignmentsList).map((text, index) => (
                        
                        <Grid
                            key={`${index}`}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.bgPaper}
                        >
                            <Grid item xs={1}>
                                <AssignmentIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs={6}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Typography variant="h6" gutterBottom>
                                        <strong>{this.state.assignmentsList[text].TITLE}</strong>
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {/* <strong>Available until</strong> {text[1]} |&nbsp; */}
                                        <strong>Due</strong>2019-03-25 at 11:59 PM |&nbsp;
                                        <strong>{this.state.assignmentsList[text].TOTAL_POINTS}</strong> pts
                                    </Typography>

                                </Grid>
                            </Grid>

                            <Grid item xs={2}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary" 
                                    className={classes.button}
                                    onClick={(e) => this.viewAssignment(e, this.state.assignmentsList[text])}
                                    >
                                      View Assignment
                                    </Button>

                                </Grid>
                            </Grid>
                            
                            <Grid style={{display: this.state.is_student == true ? 'block' : 'none'}}
                            item xs={2}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary" 
                                    className={classes.button}
                                    onClick={(e) => this.submitAssignment(e, this.state.assignmentsList[text])}
                                    >
                                      Submit Assignment
                                    </Button>

                                </Grid>
                            </Grid>

                            <Grid style={{display: this.state.is_student == true ? 'none' : 'block'}}
                            item xs={2}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary" 
                                    className={classes.button}
                                    // onClick={}
                                    >
                                      View Submissions
                                    </Button>

                                </Grid>
                            </Grid>
                              
                              
                        </Grid>

                      
                        
                    ))}

          </Collapse>

          </List>
      </div>
    );
  }
}

Assignments.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    assignmentData : state
  }
}

const mapDispacthToProps = (dispatch) => {
  return bindActionCreators(assignmentData, dispatch);
}
export default connect(mapStateToProps, mapDispacthToProps)(withStyles(styles)(Assignments));