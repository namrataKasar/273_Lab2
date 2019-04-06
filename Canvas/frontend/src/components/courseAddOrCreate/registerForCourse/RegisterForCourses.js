import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SideBar from '../../sideNavigation/SideBar'
import {Grid, Input} from '@material-ui/core'
import InsideMenu from '../registerForCourse/InsideMenu'

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
  }
});


class RegisterCourses extends React.Component {
  state = {
    sjsuID : '',
    is_student : ''
    };

  componentWillMount = () => {
      console.log(this.props);
      const data = {
        sjsuID : window.sessionStorage.getItem('sjsuID'),
        is_student : window.sessionStorage.getItem('is_student')
      }
      this.setState({
        sjsuID: data.sjsuID,
        is_student: data.is_student
      })
    }


  sendValues = {
    showInsideBar : true,
    header : 'Manage Courses'
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  render() {
    const { classes } = this.props;
    let header = "Manage Courses"
    return (
      <div>
        {this.state.redirectVar}
          <Grid container spacing={12}>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={10}>
                    <div className={classNames(classes.content)}>
                      <InsideMenu state={this.state} header={header}/>
                    </div>                    
                </Grid>
            </Grid>
      </div>
    );
  }
}

RegisterCourses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterCourses);