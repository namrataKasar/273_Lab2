import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SideBar from '../sideNavigation/SideBar'
import {Grid, Input, Typography} from '@material-ui/core'
import {Redirect} from 'react-router'
import {Paper} from "@material-ui/core"
import axios from 'axios'
import {DropzoneArea} from 'material-ui-dropzone'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as getData from '../../actions/loginAction'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 5,
    overflowX: "auto",
    padding: 30
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
  textColor1 : {
    color: '#008ee2',
  },
});


class UserProfile extends React.Component {
  state = {
    sjsuID: '',
    fName: '',
    lName: '',
    phoneNo: '',
    city: '',
    country: '',
    company: '',
    school: '',
    hometown: '',
    language: '',
    gender: '',
    aboutMe: '',
    profilePic: null,
    email: '',
    redirectVar: null,
    username: '',
    initials: ''
  };

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    const propsData = nextProps.userData.LoginReducer.LoginReducer
    if(nextProps.userData){
        this.setState ({
            sjsuID: propsData.sjsuID,
            fName: propsData.fName,
            lName: propsData.lName,
            phoneNo: propsData.phoneNo,
            city: propsData.city,
            country: propsData.country,
            company: propsData.company,
            school: propsData.school,
            hometown: propsData.hometown,
            language: propsData.language,
            gender: propsData.gender,
            aboutMe: propsData.aboutMe,
            profilePic: propsData.profilePic,
            email: propsData.email
        })

    }
}

  componentWillMount = () => {

    const data = this.props.location.state;
        this.setState({
            username : data.username,
            initials: data.initials
        })

        var sendData = {
            sjsuID: window.sessionStorage.getItem("sjsuID")
        }
        
        const propsData = this.props.userData.LoginReducer.LoginReducer
        if(this.props.userData){
            this.setState ({
                sjsuID: propsData.sjsuID,
                fName: propsData.fName,
                lName: propsData.lName,
                phoneNo: propsData.phoneNo,
                city: propsData.city,
                country: propsData.country,
                company: propsData.company,
                school: propsData.school,
                hometown: propsData.hometown,
                language: propsData.language,
                gender: propsData.gender,
                aboutMe: propsData.aboutMe,
                profilePic: propsData.profilePic,
                email: propsData.email
            })

        }

}

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  profilePicHandler = (file) => {
    //e.preventDefault();
    console.log(file);
    const fd = new FormData();
    fd.append('profileImage',file[0], file[0].name);
    console.log(fd);

    this.props.uploadProfileImage(fd);
    // .then(response => {
    //     console.log("In edit profile success");
    // })
    // .catch(error => {

    // })

    // axios.post('/uploadProfileImage', fd)
    // .then((response) => {
    //   console.log("http://localhost:3001/" + response.data.substring(9) + file[0].name);
    //   //let temp = [].concat(response.data)
    //   // if (temp[0]['msg'] === "Success") {
    //     this.setState({
    //       profilePic: "http://localhost:3001/" + response.data.substring(9) + file[0].name
    //     })
         
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }

  submitUpdate = (e) => {
    e.preventDefault();
    let data = this.state;
    this.props.updateUserDetails(data).then(
      data => {
        this.setState({
                redirectVar : <Redirect to={{
                  pathname: "/profile",
                  state: this.state}}/>
              })
      },
      err => {

      }
    )
    //console.log(data.profilePic.name)
    // axios.put('/user/update', {data})
    //   .then((response) => {
    //     console.log(response);
    //     //window.sessionStorage.setItem("userid",this.state.sjsuID);
    //     this.setState({
    //       redirectVar : <Redirect to={{
    //         pathname: "/profile",
    //         state: this.state}}/>
    //     })
    //   });

  }

  render() {
    const { classes } = this.props;
    const header = "Edit Profile";
    return (
      <div>
          {this.state.redirectVar}
          
          <Grid container spacing={12}>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6" className={classes.textColor1} noWrap>
                    {header}
                    </Typography>
                  <Paper className={classes.root} >
                    <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitUpdate}>
                        <TextField
                        disabled
                        id="sjsuID"
                        label="SJSU Id"
                        fullWidth
                        value={this.state.sjsuID}
                        onChange={this.handleChange('sjsuID')}
                        margin="normal"
                        />

                        <TextField
                        id="fName"
                        label="First Name"
                        value={this.state.fName}
                        fullWidth
                        onChange={this.handleChange('fName')}
                        margin="normal"
                        />

                        <TextField
                        id="lName"
                        label="Last Name"
                        value={this.state.lName}
                        fullWidth
                        onChange={this.handleChange('lName')}
                        margin="normal"
                        />

                        <TextField
                        id="email"
                        label="Email ID"
                        value={this.state.email}
                        fullWidth
                        onChange={this.handleChange('email')}
                        margin="normal"
                        type="email"
                        />

                        <TextField
                        id="phoneNo"
                        label="Phone Number"
                        value={this.state.phoneNo}
                        fullWidth
                        onChange={this.handleChange('phoneNo')}
                        margin="normal"
                        />

                        <TextField
                        id="schhol"
                        label="School"
                        value={this.state.school}
                        fullWidth
                        onChange={this.handleChange('school')}
                        margin="normal"
                        />

                        <TextField
                        id="company"
                        label="Company"
                        value={this.state.company}
                        fullWidth
                        onChange={this.handleChange('company')}
                        margin="normal"
                        />
                      
                        <TextField
                        id="hometown"
                        label="Hometown"
                        value={this.state.hometown}
                        fullWidth
                        onChange={this.handleChange('hometown')}
                        margin="normal"
                        />

                        <TextField
                        id="city"
                        label="City"
                        value={this.state.city}
                        fullWidth
                        onChange={this.handleChange('city')}
                        margin="normal"
                        />

                        <TextField
                        id="country"
                        label="Country"
                        value={this.state.country}
                        fullWidth
                        onChange={this.handleChange('country')}
                        margin="normal"
                        />

                        <TextField
                        id="gender"
                        label="Gender"
                        value={this.state.gender}
                        fullWidth
                        onChange={this.handleChange('gender')}
                        margin="normal"
                        />

                        <TextField
                        id="aboutMe"
                        label="About Me"
                        value={this.state.aboutMe}
                        fullWidth
                        onChange={this.handleChange('aboutMe')}
                        margin="normal"
                        />
                        
                        {/* <label>Profile Picture</label>
                        <input
                        id="profilePic"
                        type="file"
                        onChange={this.profilePicHandler}
                        >
                        </input> */}

                        <DropzoneArea 
                        id="profilePic"
                        filesLimit={1}
                        dropzoneText={'Upload'}
                        onChange={this.profilePicHandler.bind(this)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Update Profile
                        </Button>
                    </form>
                  </Paper>
                </Grid>
            </Grid>
      </div>
    );
  }
}

UserProfile.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile));