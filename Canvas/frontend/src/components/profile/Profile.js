import React from 'react';
import classNames from 'classnames';
import PropTypes from "prop-types";
import SideBar from '../sideNavigation/SideBar'
import { Grid, Button, SvgIcon, Avatar } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from '@material-ui/core/Icon';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
// import {getUserDetails} from '../../actions/loginAction'
import {bindActionCreators} from 'redux'
import * as getData from '../../actions/loginAction'

const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      minWidth: 400
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
      },
    buttonMargin:{
        marginTop: 24
    },
    bigAvatar: {
        margin: 10,
        width: 150,
        height: 150
    }
  });


  
class Profile extends React.Component{

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
        profilePic: '',
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

         console.log("Hello in profile");
         console.log(this.props);
        const data = this.props.location.state;
        this.setState({
            username : data.username,
            initials: data.initials
        })

        var sendData = {
            sjsuID: this.props.userData.LoginReducer.LoginReducer.sjsuID
        }
        const propsData = this.props.userData.LoginReducer.LoginReducer
        console.log(propsData);
        if(propsData)
        {
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
            });
        }
        
        // this.props.getUserDetails(sendData).then(
        //     (data) => {
        //         console.log("Hello")
        //         console.log(data);
        //         const propsData = this.props.userData.LoginReducer.LoginReducer
        //         if(this.props.userData){
        //             this.setState ({
        //                 sjsuID: propsData.sjsuID,
        //                 fName: propsData.fName,
        //                 lName: propsData.lName,
        //                 phoneNo: propsData.phoneNo,
        //                 city: propsData.city,
        //                 country: propsData.country,
        //                 company: propsData.company,
        //                 school: propsData.school,
        //                 hometown: propsData.hometown,
        //                 language: propsData.language,
        //                 gender: propsData.gender,
        //                 aboutMe: propsData.aboutMe,
        //                 profilePic: propsData.profilePic,
        //                 email: propsData.email
        //             })

        //         }
        //     },
        //     (err) => {

        //     }

        // );

    }

    render(){
        // if(this.state.sjsuID == '')
        // {
        //     return <Redirect to="/login" /> 
        // }
        const rows = [
            {
                id:1,
                type:"SJSU ID",
                info:this.state.sjsuID
            },
            {
                id:2,
                type:"First Name",
                info:this.state.fName
            },
            {
                id:3,
                type:"Last Name",
                info:this.state.lName
            },
            {
                id:4,
                type:"Email",
                info:this.state.email
            },
            {
                id:5,
                type:"Phone No",
                info:this.state.phoneNo
            },
            {
                id:6,
                type:"School",
                info:this.state.school
            },
            {
                id:7,
                type:"Company",
                info:this.state.company
            },
            {
                id:8,
                type:"Hometown",
                info:this.state.hometown
            },
            {
                id:9,
                type:"City",
                info:this.state.city
            },
            {
                id:10,
                type:"Country",
                info:this.state.country
            },
            {
                id:11,
                type:"Gender",
                info:this.state.gender
            },
            {
                id:12,
                type:"Language",
                info:this.state.language
            },
            {
                id:13,
                type:"About me",
                info:this.state.aboutMe
            }
        ];

        const { classes } = this.props;
        return(
            <div>
                <Grid container spacing={12}>
                    <Grid item xs={2}>
                        <SideBar state={{sjsuID:this.state.sjsuID,
                                          is_student:this.state.is_student}}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar alt={this.state.initials} src={this.state.profilePic} className={classes.bigAvatar}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.root} style={{ width: 500}}>
                            <Table className={classes.table}>
                                <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.id}>
                                    
                                    <TableCell align="left">{row.type}</TableCell>
                                    <TableCell align="right">{row.info}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                    <Button variant="contained" className={classNames(classes.button, classes.buttonMargin)}
                    component={Link} to={{pathname: '/editprofile', state: this.state}}>
                        Edit Profile
                        <SvgIcon>
                            <path fill="#000000" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" />
                        </SvgIcon>
                    </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    // getUserDetails: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return{
        userData : state
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));