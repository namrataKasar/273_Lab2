import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SideBar from '../sideNavigation/SideBar'
import {Grid, Input} from '@material-ui/core'
import {Redirect} from 'react-router'
import CourseInsideMenu from './CourseInsideMenu';

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
    marginTop: 20,
    overflowX: "auto",
    padding: '5% 10% 5%'
  },
});


class CourseHome extends React.Component {
  state = {
    sjsuID: '',
    is_student: '',
    courseId: '',
    courseName: ''
    };

  componentWillMount = () => {
    console.log(window.sessionStorage.getItem('courseName'));
    //const data = this.props.location.state;
    // window.sessionStorage.setItem('courseId', data.courseId);
    // window.sessionStorage.setItem('courseName', data.courseName);
    this.setState({
      sjsuID : window.sessionStorage.getItem('sjsuID'),
      is_student : window.sessionStorage.getItem('is_student'),
      courseId : window.sessionStorage.getItem('courseId'),
      courseName : window.sessionStorage.getItem('courseName'),

    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.redirectVar}
          <Grid container spacing={16}>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={10}>
                    <div className={classNames(classes.content)}>
                      <CourseInsideMenu parentData={this.state} />
                    </div>                    
                </Grid>
            </Grid>
      </div>
    );
  }
}

CourseHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseHome);