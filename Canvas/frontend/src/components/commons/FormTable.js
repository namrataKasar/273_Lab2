import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Typography, TextField, Paper, Button} from '@material-ui/core';
import {Redirect} from 'react-router'
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as enrolData from '../../actions/enrollmentAction';

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
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    // width: 200,
    marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 5,
      width: 250,
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
  submit1: {
    backgroundColor: '#0055a2',
    color: '#fff',
    marginTop: 50,
    marginLeft: 60
  },
  textColor1:{
      color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
  },
  paperClass1:{
    marginTop: 20,
    overflowX: "auto",
    padding: '1% 5% 5%'
  },
});

class FormTable extends React.Component {
  
  state = {
    courseId : '',
    sjsuID : '', //logged in user,
    is_student : '',
    sendRows : '',
    sendRowHeaders : '',
    sendButton: '',
    sendHeader: '',
    redirect: null,
    addByCode : false,
    addByCodeCourseID : '',
    addCode: '',
    errorMessage: ''

  }

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
  
  handleChange = name => e => {
    this.setState({
     [name] : e.target.value,
     errorMessage : ''
    })
 }

  onSubmit = (e, id, btn) => {
    //e.preventDefault();
    console.log(btn);
    console.log(id);
  
    this.setState({
      courseId : id
    })
    const data = {
      courseId : id,
      sjsuID : window.sessionStorage.getItem('sjsuID')
    };
    if(btn == "Enroll")
    {
      this.props.enrolForCourse(data)
      .then(response => {
        console.log(response);
        this.setState({
              redirect : <Redirect to='/registercourses/home'/>
            })
        
      })
      .catch(error=>{
        console.log(error);
      })
    }
    else if(btn == "Drop")
    {
     
      this.props.deleteCourse(data)
      .then(response => {

      })
      .catch(error => {
        
      })
    }
    else if(btn == "Enroll By Add Code")
    {
      this.setState({
        addByCode : true
      })
    }
  }

  submitAddCode = () => {

    const data = this.state;
    Axios.post('/validateAddCode', {data})
    .then(response => {
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    })

  }

  render() {
    const { classes } = this.props;
    console.log("Form table")
    console.log(this.props);
    const headers = this.props.sendRowHeaders;
    const btn = this.props.sendButton;
    const showTable = this.props.showTable;
    let header = this.props.sendHeader;
    let rows = this.props.sendRows;
    if(btn == "Drop")
    {
      rows = this.props.enrolData.LoginReducer.LoginReducer.courses;
      console.log(rows);
    }
    
    
      
    let mainBody = '';
        if(rows != '')
        {
          mainBody = rows.map(row => (
            <TableRow key={row.COURSE_ID}>
            
            <TableCell>{row.COURSE_ID}</TableCell>
            <TableCell>{row.COURSE_NAME}</TableCell>
            <TableCell>{row.CREATED_BY}</TableCell>
            <TableCell>{row.COURSE_ROOM}</TableCell>
            <TableCell><button onClick={(e) => this.onSubmit(e, row.COURSE_ID, btn)}>{btn}</button></TableCell>
            </TableRow>
        ));
        }
    // }

    let message = '';
    if(showTable === false && header == "Course Dashboard")
    {
      message = 'You have not enrolled for any course!!!'
    }
    else if(showTable === false && header == "Courses")
    {
      message = 'No course found!!!'
    }
   
    return (
      <div>
        <div className={classes.root} >
        {this.state.redirect}
          <Typography variant="h6" className={classes.textColor1} noWrap>
            {header}
          </Typography>

          <Typography variant="h6" className={classes.textColor1} noWrap>
            {message}
          </Typography>
        </div>
        
        
        <Paper className={classes.paperClass}>
            <Table className={classes.table} style={{display : showTable ? 'inline-table': 'none'}}>
                <TableHead>
                  <TableRow>

                    {headers.map((text, index) => (
                      <TableCell key={index}>{text}</TableCell>
                    ))}

                  </TableRow>
               </TableHead>
                <TableBody>
                {mainBody}
                </TableBody>
            </Table>
        </Paper>

        <div style={{display: this.state.addByCode ? 'block' : 'none'}}>
          <Typography variant="h6" className={classes.textColor1} style={{marginTop : 20}}noWrap>
              Enroll to course by Permission Code
          </Typography>
          <Paper className={classes.paperClass1}>
            <form className={classes.container} onSubmit={this.submitAddCode}>
              <div>
                <TextField
                id="addByCodeCourseID"
                label="Course ID"
                className={classes.textField}
                value={this.state.addByCodeCourseID}
                onChange={this.handleChange('addByCodeCourseID')}
                margin="normal"
                required
                />

                <TextField
                id="addCode"
                label="Permission Code"
                className={classes.textField}
                value={this.state.addCode}
                onChange={this.handleChange('addCode')}
                margin="normal"
                required
                />

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.submit1}
                  >
                  Submit Add Code
                </Button>

              </div>
            </form>
          </Paper>
        </div>

      </div>
    );
  }
}

FormTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    enrolData : state
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(enrolData, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(FormTable));