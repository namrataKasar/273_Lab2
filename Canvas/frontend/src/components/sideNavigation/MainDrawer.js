import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as getData from '../../actions/loginAction';
import * as courseData from '../../actions/courseHomeAction';

const styles = theme => ({
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  avatar: {
    margin: 30,
  },
  //   My styles
  lettersAvtar: {
    padding: 30,
    marginTop: 30,
    color: '#0055a2',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '2px',
    fontSize: '27px',
    fontWeight: 'bold',
  },
  setMarginClose: {
    marginLeft: 54,
  },
  setMarginOpen: {
    marginLeft: 84,
  },
  logout_button: {
      marginBottom: 30
  },
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150
},
textColor1: {
  color: '#008ee2',
  fontSize: 18
}
});

class MainDrawer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            sjsuID : '', //Logged In user
            is_student : '',
            username : '',
            initials : '',
            child1: false,
            child2: false,
            child3: false,
            editProfile: false,
            redirectVar : false,
            profilePic : '',
            rows : '' //list of courses enrolled / created.
        }
    }

    componentWillMount = () => {
      const data = this.props.status;
      const propsData = this.props.userData.LoginReducer.LoginReducer
      if(this.props.userData){
        this.setState ({
          sjsuID: propsData.sjsuID,
          username: propsData.fName + " " + propsData.lName,
          initials: propsData.fName.substring(0,1) + " " + propsData.lName.substring(0,1),
          profilePic: propsData.profilePic,
        })
      }
    }

    componentWillReceiveProps(props) {
        this.setState({
            child1: props.status.child1_open,
            child2: props.status.child2_open,
            child3: props.status.child3_open,
            sjsuID: props.status.sjsuID,
            is_student: props.status.is_student
        });
        const data = props.status;
      }
  toggleDrawer = (open) => () => {
    this.setState({
      child1: open
    });
  
  };
  toggleDrawer2 = (open) => () => {
    this.setState({
        child2: open
    });
    console.log("called in here")
  };
  toggleDrawer3 = (open) => () => {
    this.setState({
      child3: open
    });
  };

  handleProfileClick = (e) =>
  {
    this.setState({
      editProfile: true,
      redirectVar : true
    });
  }

  handleLogout = (e) => {
    window.sessionStorage.setItem("sjsuID", '');
    const data = this.state;
    this.props.userLogout(data)
    .then(response => {

    })
    .catch(error => {

    })
  }

  setCourse = (courseId, courseName) => {
    console.log("Set course");
    console.log(courseId);
    const data = {
      courseId : courseId,
    }
    
    window.sessionStorage.setItem('courseId', courseId);
    window.sessionStorage.setItem('courseName', courseName);

    this.props.getCourseDetails(data)
    .then(response => {

    })
    .catch(error => {

    })
  }
  render() {
    let sjsuID = window.sessionStorage.getItem("sjsuID");
    //const redirectVar = this.state.redirectVar
    if(sjsuID == '')
    {
      return <Redirect to="/login" /> 
    }
    const { classes } = this.props;
    const courseList = this.props.userData.LoginReducer.LoginReducer.courses;
    console.log(courseList);
    const sideList = (
      <div className={classNames(classes.list ,this.props.status.open ? classes.setMarginOpen : classes.setMarginClose)}>
       <Grid container justify = "center" direction="column" alignItems="center">
       
       {/* <Avatar className={classes.lettersAvtar}> */}
       <Avatar alt={this.state.initials} src={this.state.profilePic} className={classes.bigAvatar}/>
       {/* <img></img>
       {this.state.initials}</Avatar> */}
       <Typography variant="h5" gutterBottom>
        {this.state.username}
      </Typography>
        <Button variant="outlined" className={classNames(classes.button, classes.logout_button)} onClick={this.handleLogout}>
            Log Out
        </Button>
        </Grid>
       
        <Divider />
        <List>
          <ListItem component={Link} to={{pathname: '/profile', state:this.state}}>
           <ListItemText primary={"Profile"} />
          </ListItem>
        </List> 
      </div>
    );

    const listOfCourses = (
      <div className={classNames(classes.list ,this.props.status.open ? classes.setMarginOpen : classes.setMarginClose)} style={{padding: '0 1.5rem'}}>
        <h2>Courses</h2>
        <hr role="presentation"></hr>
            <div>
                <List>
                    {Object.keys(courseList).map((course, index) =>(
                      <Link to={{pathname: '/course/home'}} 
                      onClick={() => this.setCourse(courseList[course].COURSE_ID, courseList[course].COURSE_NAME)}>
                        <ListItem className={classes.textColor1}>
                            {courseList[course].COURSE_ID + " : " +courseList[course].COURSE_NAME } 
                          </ListItem>
                      </Link>
                    ))}
                </List>
            </div>

      </div>
    )

    const helpInfo = (
      <div className={classNames(classes.list ,this.props.status.open ? classes.setMarginOpen : classes.setMarginClose)}>
        <Grid container justify = "center" direction="column" alignItems="center">    
          <Typography variant="h5" gutterBottom>
            Help!
          </Typography>
        </Grid>
       
        <Divider />
          <List>
            {['Contact Professor'].map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        <Divider />
      </div>
    );
        if(this.state.child1){
            return (
                <div>
                  {/* <Button onClick={this.toggleDrawer('child1', true)}>Open Left</Button> */}
                  {/* <Button onClick={this.toggleDrawer(true)}>Open Left</Button> */}
                  {/* <Drawer open={this.state.child1} onClose={this.toggleDrawer('child1', false)}> */}
                  <Drawer open={this.state.child1} onClose={this.toggleDrawer(false)}>
                    <div
                      tabIndex={0}
                      role="button"
                      // onClick={this.toggleDrawer('child1', false)}
                      // onKeyDown={this.toggleDrawer('child1', false)}
                      onClick={this.toggleDrawer(false)}
                      onKeyDown={this.toggleDrawer(false)}
                    >
                    {/* if({this.state.child1}){
                        {sideList}
                    }else if({this.state.child2}){
          
                    } */}
                    {sideList}
                    </div>
                  </Drawer>
                </div>
              );
          }else if(this.state.child2){
            return (
                <div>
                  {/* <Button onClick={this.toggleDrawer('child1', true)}>Open Left</Button> */}
                  {/* <Button onClick={this.toggleDrawer(true)}>Open Left</Button> */}
                  {/* <Drawer open={this.state.child1} onClose={this.toggleDrawer('child1', false)}> */}
                  <Drawer open={this.state.child2} onClose={this.toggleDrawer2(false)}>
                    <div
                      tabIndex={0}
                      role="button"
                      // onClick={this.toggleDrawer2('child1', false)}
                      // onKeyDown={this.toggleDrawer2('child1', false)}
                      onClick={this.toggleDrawer2(false)}
                      onKeyDown={this.toggleDrawer2(false)}
                    >
                    {/* if({this.state.child1}){
                        {sideList}
                    }else if({this.state.child2}){
          
                    } */}
                    {listOfCourses}
                    </div>
                  </Drawer>
                </div>
              );
          }else if(this.state.child3){
            return (
                <div>
                  <Drawer open={this.state.child3} onClose={this.toggleDrawer3(false)}>
                    <div
                      tabIndex={0}
                      role="button"
                      // onClick={this.toggleDrawer2('child1', false)}
                      // onKeyDown={this.toggleDrawer2('child1', false)}
                      onClick={this.toggleDrawer3(false)}
                      onKeyDown={this.toggleDrawer3(false)}
                    >
                    {/* if({this.state.child1}){
                        {sideList}
                    }else if({this.state.child2}){
          
                    } */}
                    {helpInfo}
                    </div>
                  </Drawer>
                </div>
              );
          }else{
            return (
                <div>
                </div>
              );
          }

    
  }
}

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
      userData : state
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MainDrawer));