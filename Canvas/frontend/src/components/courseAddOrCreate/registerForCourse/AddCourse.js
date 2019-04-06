import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as search from '../../../actions/courseAction'
import FormTable from '../../commons/FormTable';
import {Redirect} from 'react-router'

const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 10,
      overflowX: "auto"
    },
    table: {
      minWidth: 400
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
    //   width: 200,
      marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 5,
      width: 250,
        
    },
    textField2: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        width: 170,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#007dc1',
        color: '#fff !important'
      },
    textColor1:{
        color: '#008ee2',
    },
    paperClass:{
      marginTop: 20,
      overflowX: "auto",
      padding: '5% 10% 5%'
    },
    fullWidth: {
        width: '100%'
    }
  });


class AddCourse extends React.Component{
      
    state = {
        courseTerm: 'Spring 2019',
        courseDept: '',
        courseId: '',
        courseName: '',
        courseFilter: 'is exactly',
        sendRows : '',
        sendRowHeaders : '',
        sendHeader : '',
        sendButton : '',
        formTable : '',
        searchCategory : 'By Course ID',
        showByID : true,
        showByTerm : false,
        showByName : false,
        errorMessage : '',
        sjsuID : '',
        is_student : '',
        redirect : ''

    }

    handleChange = name => e => {
       this.setState({
        [name] : e.target.value,
        errorMessage : ''
       })
    }

    componentWillMount = () => {
      //const data = this.props.state;
      const data = {
        sjsuID : window.sessionStorage.getItem('sjsuID'),
        is_student : window.sessionStorage.getItem('is_student')
      }
      this.setState({
        sjsuID : data.sjsuID,
        is_student : data.is_student
      })
    }



    checkSearchCategory  = (e) => {
      //e.preventDefault();
      console.log("Hell" + e.target.value);
    
       if(e.target.value === 'By Course ID')
       {
          this.setState({
            searchCategory : e.target.value,
            showByID : true,
            showByName : false,
            showByTerm : false,
            errorMessage : ''
          })
       }
       else if(e.target.value === 'By Term')
       {
          this.setState({
            searchCategory : e.target.value,
            showByID : false,
            showByName : false,
            showByTerm : true,
            errorMessage : ''
          })
       }
       else if(e.target.value === 'By Course Name')
       {
            this.setState({
              searchCategory : e.target.value,
              showByID : false,
              showByName : true,
              showByTerm : false,
              errorMessage : ''
            })
       }
       
    }    
  
    submitSearch = (e) => {
      e.preventDefault();

      const data = this.state;
      let showTable = false;
      if(this.state.searchCategory === 'By Course ID')
      {
        if(this.state.courseId === '')
        {
          this.setState({
            errorMessage : 'Enter Cousre ID to search.'
          })
        }
        else{
          this.setState({
            errorMessage : ''
          })

          this.props.searchCourses(data)
          .then(response => {
            console.log(response);
            if(response.data.course != '')
            {
              showTable = true;
            }
            this.setState({
              sendRows : response.data.course,
              sendRowHeaders : ["Course ID", "Name", "Instructor", "Room", ""],
              sendHeader : "Courses",
              sendButton : "Enroll"
            })
            this.setState({
              formTable : <FormTable sendRows={this.state.sendRows} sendRowHeaders={this.state.sendRowHeaders}
                          sendHeader={this.state.sendHeader} sendButton={this.state.sendButton} showTable={showTable}/> 
            })
          })
          .catch(error => {
            console.log(error);
            this.setState({
              redirect : <Redirect to='/'/>
            })
          })

        }
      }
      else if(this.state.searchCategory === 'By Term')
      {
        this.setState({
            errorMessage : ''
          })

          this.props.searchCourses(data)
          .then(response => {
            console.log(response);
            if(response.data.course != '')
            {
              showTable = true;
            }
            this.setState({
              sendRows : response.data.course,
              sendRowHeaders : ["Course ID", "Name", "Instructor", "Room", ""],
              sendHeader : "Courses",
              sendButton : "Enroll"
            })
            this.setState({
              formTable : <FormTable sendRows={this.state.sendRows} sendRowHeaders={this.state.sendRowHeaders}
                          sendHeader={this.state.sendHeader} sendButton={this.state.sendButton} showTable={showTable}/> 
            })
          })
          .catch(error => {
            console.log(error);
            this.setState({
              redirect : <Redirect to='/'/>
            })
          })

      }
      else if(this.state.searchCategory === 'By Course Name')
      {
        if(this.state.courseName === '')
        {
          this.setState({
            errorMessage : 'Enter course Name to search.'
          })
        }
        else{
          this.setState({
            errorMessage : ''
          })

          this.props.searchCourses(data)
          .then(response => {
            console.log(response);
            if(response.data.course != '')
            {
              showTable = true;
            }
            this.setState({
              sendRows : response.data.course,
              sendRowHeaders : ["Course ID", "Name", "Instructor", "Room", ""],
              sendHeader : "Courses",
              sendButton : "Enroll"
            })
            this.setState({
              formTable : <FormTable sendRows={this.state.sendRows} sendRowHeaders={this.state.sendRowHeaders}
                          sendHeader={this.state.sendHeader} sendButton={this.state.sendButton} showTable={showTable}/> 
            })
          })
          .catch(error => {
            console.log(error);
            this.setState({
              redirect : <Redirect to='/'/>
            })
          })

        }
      }
      
    }

    render(){
        const { classes } = this.props;
        const header = "Add Course"
        const courseFilters = ["is exactly", "greater than or equal to", "less than or eqaul to"];
        const terms = ["Spring 2019", "Fall 2019"];
        const categories = ['By Course ID', 'By Term', 'By Course Name'];
        console.log("Add Course");
      
        return(
            <div>
              {this.state.redirect}
                <div className={classes.root} >
                <Typography variant="h6" className={classes.textColor1} noWrap>
                    {header}
                </Typography>
                </div>
                <Paper className={classes.paperClass}>
                    <form className={classes.container} onSubmit={this.submitSearch}>
                        <div className={classes.fullWidth}>
                          <label style={{color:'red'}}>{this.state.errorMessage}</label>
                        </div>
                        <div>
                          <TextField
                            id="searchCategory"
                            select
                            label="Select Search Category"
                            className={classes.textField}
                            value={this.state.searchCategory}
                            onChange={this.checkSearchCategory}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            helperText="Please select the search category"
                            margin="normal"
                            >
                            {categories.map(option => (
                                <option key={option} value={option}>
                                {option}
                                </option>
                            ))}
                          </TextField>
                        </div>
                        <div style={{display: this.state.showByTerm ? 'block' : 'none' }}>
                          <TextField
                          id="courseTerm"
                          select
                          label="Select Term"
                          className={classes.textField}
                          value={this.state.courseTerm}
                          onChange={this.handleChange('courseTerm')}
                          SelectProps={{
                              native: true,
                              MenuProps: {
                              className: classes.menu,
                              },
                          }}
                          helperText="Please select the term"
                          margin="normal"
                          >
                          {terms.map(option => (
                              <option key={option} value={option}>
                              {option}
                              </option>
                          ))}
                          </TextField>
                        </div>

                        <div style={{display: this.state.showByName ? 'block' : 'none' }}>
                          <TextField
                          id="courseName"
                          label="Course Name"
                          className={classes.textField}
                          value={this.state.courseName}
                          onChange={this.handleChange('courseName')}
                          margin="normal"
                          />
                        </div>

                        <div style={{display: this.state.showByID ? 'block' : 'none' }}>
                            <TextField
                            id="courseFilter"
                            select
                            label="Filter Course ID by"
                            className={classes.textField}
                            value={this.state.courseFilter}
                            onChange={this.handleChange('courseFilter')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            helperText=""
                            margin="normal"
                            >
                            {courseFilters.map(option => (
                                <option key={option} value={option}>
                                {option}
                                </option>
                            ))}
                            </TextField>

                            <TextField
                            id="courseId"
                            label="Course ID To Filter"
                            className={classes.textField}
                            value={this.state.courseId}
                            onChange={this.handleChange('courseId')}
                            margin="normal"
                            />

                           
                        </div>
                        
                        <div>
                            <TextField
                            id="courseDept"
                            label="Department"
                            className={classes.textField}
                            style={{float: 'left', display: this.state.showByName ? 'none' : 'inline-flex'}}
                            value={this.state.courseDept}
                            onChange={this.handleChange('courseDept')}
                            margin="normal"
                            />
                          </div>

                        <div className={classes.fullWidth}>
                            <Button
                            type="submit"
                            variant="contained"
                            className={classes.submit}
                            >
                            Search
                            </Button>
                        </div>
                    </form>
                </Paper>

                
              {this.state.formTable}            
            </div>
        )
    }
}

AddCourse.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
  return {
    search : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(search,dispatch)

} 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCourse));