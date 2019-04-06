import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormTable from '../../commons/FormTable';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as enrolData from '../../../actions/enrollmentAction';


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
  textColor1:{
      color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
  }
});


class CourseDashboard extends React.Component {
  
  state = {
    sjsuID : '', //logged in user
    is_student : '',
    sendRows : '',
    sendRowHeaders : '',
    sendHeader : '',
    sendButton : '',
    formTable : '',
    waitListTable : '',
  }

  componentWillReceiveProps = () => {
    const data = {
      sjsuID : window.sessionStorage.getItem('sjsuID'),
      is_student : window.sessionStorage.getItem('is_student')
    }
    const propsData = this.props.enrolData.LoginReducer.LoginReducer;
      console.log(propsData);

      let showTable = false;
      if(propsData != '')
        showTable = true;
      this.setState({
        sendRows : propsData.courses,
        sendRowHeaders : ["Course ID", "Name", "Instructor", "Room", ""],
        sendHeader : "Courses",
        sendButton : "Drop"
      })

      const sendRowHeaders = ["Course ID", "Name", "Instructor", "Room", ""];
      const sendHeader = "Courses";
      const sendButton = "Drop";
      this.setState({
        formTable : <FormTable sendRowHeaders={sendRowHeaders}
                    sendHeader={sendHeader} sendButton={sendButton} showTable={showTable}
                    state={this.state}/> 
      })
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
    console.log("Mounted");

    // this.props.enrolledCourses(data)
    // .then(resposne => {
      const propsData = this.props.enrolData.LoginReducer.LoginReducer;
      console.log(propsData);

      let showTable = false;
      if(propsData != '')
        showTable = true;
      this.setState({
        sendRows : propsData.courses,
        sendRowHeaders : ["Course ID", "Name", "Instructor", "Room", ""],
        sendHeader : "Courses",
        sendButton : "Drop"
      })

      const sendRowHeaders = ["Course ID", "Name", "Instructor", "Room", ""];
      const sendHeader = "Courses";
      const sendButton = "Drop";
      this.setState({
        formTable : <FormTable sendRowHeaders={sendRowHeaders}
                    sendHeader={sendHeader} sendButton={sendButton} showTable={showTable}
                    state={this.state}/> 
      })

  }
  deleteCourse  = (id) => {
    console.log(id);
    console.log("Hello")
    //console.log(e.target.value);
  }
 
  render() {
    const { classes } = this.props;
    //const rows = this.props.rows;

    return (
      <div>
        {this.state.formTable}
        {this.state.waitListTable}
        </div>
    );
  }
}

CourseDashboard.propTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CourseDashboard));