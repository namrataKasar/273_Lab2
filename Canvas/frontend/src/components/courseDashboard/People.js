import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// import SearchBar from 'material-ui-search-bar';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseData from '../../actions/enrollmentAction';

const CustomTableCell = withStyles(theme => ({
  head: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 10,
    // overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '15px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    },
  iconButton: {
    padding: 10,
    },
  profileImg: {
    margin: 'auto',
  },
  textColor1:{
    color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 10% 5%'
  }
  
});




const rows = [ {
                  name: 'Mayank Padshala',
                  section: 'Section 1',
                  role: 'Student',
                },
                {
                  name: 'Arivoli',
                  section: 'Section 1',
                  role: 'Teacher',
                },
                {
                  name: 'Anurag',
                  section: 'Section 1',
                  role: 'TA',
                }, 
             ];

class People extends React.Component {

  state = {
    enrolledStudents: '',
    sjsuID: '',
    is_student: '',
    courseId: ''
  };

  componentWillMount() {
    console.log("Hello");

    this.setState({
      is_student : window.sessionStorage.getItem('is_student'),
      sjsuID : window.sessionStorage.getItem('sjsuID'),
      courseId : window.sessionStorage.getItem('courseId')
    })
    const data = {
      courseId : window.sessionStorage.getItem('courseId')
    }
    this.props.getEnrolledStudents(data)
    .then(response => {
        if(this.props.courseData)
        {
          const propsData = this.props.courseData.CourseReducer.CourseReducer;
          console.log(propsData);
          this.setState({
              enrolledStudents : propsData.studentsEnrolled
            })
        }
    })
    .catch(error => {

    })
    // Axios.post('/getStudentsByCourse', {data})
    // .then(response => {
    //   console.log(response);
    //   this.setState({
    //     enrolledStudents : response.data
    //   })
    // }).catch(error => {
    //   console.log(error);
    // })

    
  }

  onRemove = (e, studentID) => {

    e.preventDefault();
    const data = {
      sjsuID: studentID,
      courseId: this.state.courseId
    };
    // console.log(data.courseId);
    Axios.post('/removeStudent', {data})
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error);
    })

  }
  

  render() {
    const { classes } = this.props;
    const header = "People"
    console.log(this.state.enrolledPeople)
    return (
      <div>
        
        <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                {header}
            </Typography>
        </div>
        <Paper className={classes.paperClass}>


          <Grid
              container
              direction="row"
              justify="space-evenly"
              // alignItems="center"
              item xs={12}
          >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="right"></CustomTableCell>
                <CustomTableCell >Name</CustomTableCell>
                <CustomTableCell >Role</CustomTableCell>
                <CustomTableCell align="center" style={{display: this.state.is_student == "false" ? 'table-cell' : 'none'}}></CustomTableCell>
                {/*<CustomTableCell align="center">Role</CustomTableCell>
                <CustomTableCell></CustomTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.state.enrolledStudents).map(index => (
                <TableRow className={classes.row} key={this.state.enrolledStudents[index].SJSU_ID}>
                  {/* {console.log(row)} */}
                  <CustomTableCell align="right">
                  <Avatar alt={this.state.enrolledStudents[index].FNAME.substring(0,1)+this.state.enrolledStudents[index].LNAME.substring(0,1)}
                  src={this.state.enrolledStudents[index].PROFILE_PIC}
                  className={classes.profileImg} >
                  
                  </Avatar>
                  </CustomTableCell>
                  <CustomTableCell>{this.state.enrolledStudents[index].FNAME + " " + this.state.enrolledStudents[index].LNAME}</CustomTableCell>
                  <CustomTableCell>
                    Student
                  </CustomTableCell>
                  <CustomTableCell style={{display: this.state.is_student == "false" ? 'table-cell' : 'none'}}>
                    <button onClick={(e) => this.onRemove(e, this.state.enrolledStudents[index].SJSU_ID)}>Remove Student</button>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Grid>
        </Paper>
      </div>
          

    );
  }
}

People.propTypes = {
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
export default connect(mapStateToProps, mapDispacthToProps)(withStyles(styles)(People));