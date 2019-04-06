import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {userSignup} from '../../actions/loginAction';


const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
      backgroundColor: '#007dc1',
      color: '#fff !important'
    },
    sjsuLogo: {
      display: 'block',
      margin: 0,
      maxWidth: 200,
      maxHeight: 40,
    },
    loginHeader: {
      width: '100%',
      padding: '5% 25% 10%',
      borderBottom: '1px solid #ddd'
    },
    infoText: {
      fontWeight: '600',
      color: '#5e5e5e',
      fontSize: '20px',
      margin: '10% 0 0',
    },
    errorMsg: {
      color: 'red',
      marginTop: 15
    }
  });

class Signup extends Component {
 
  state = {
      sjsuID : '',
      firstName : '',
      lastName : '',
      password : '',
      isStudent : true,
      email : '',
      errorMsg : '',
      redirectVar : null
  }

  handleChange = (e) => {
    this.setState({
          [e.target.name] : e.target.value,
          errorMsg : ""
      })
  }

  submitLogin = (e) => {
    console.log(this.state);
    e.preventDefault();
    const data = this.state;
    console.log(data.password);

    this.props.userSignup(data).then(
      data => {
        console.log(data)
        if(data.data.code === "ER_DUP_ENTRY")
        {
          this.setState({
            errorMsg : "This ID already exists!!"
          })
          console.log(this.state.errorMsg);
        }
        else{
          this.setState({
            redirectVar : <Redirect to= "/login"/>
          })
        }
      },
      error => 
      { 
        console.log(error);
      }
    )
    .catch(error =>{
      console.log(error);
    })
    
  }
  render(){
    const { classes } = this.props;
      return (
        <div>
          {this.state.redirectVar}
          <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <div className={classes.loginHeader}>                
          <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" 
            className={classes.sjsuLogo} alt="San Jose State University"/>                
          <div data-type="beacon-container" className="beacon-container"></div>      
        </div>
        <div>
          <h2 className={classes.infoText}>Sign Up</h2>
          <div className={classes.errorMsg}>
            <label>{this.state.errorMsg}</label>  
          </div>
          <form className={classes.form} onSubmit={this.submitLogin}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="number">ID</InputLabel>
              <Input id="sjsuID" name="sjsuID" onChange={this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">First Name</InputLabel>
              <Input name="firstName" type="text" id="firstName"  onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Last Name</InputLabel>
              <Input name="lastName" type="text" id="lastName"  onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input name="email" type="email" id="email" autoComplete=""  onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete=""  onChange={this.handleChange}/>
            </FormControl>         
            
            <FormControlLabel
              control={<Checkbox name="isStudent" value={false} color="primary" onChange={this.handleChange}/>}
              label="Sign Up As Faculty"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Paper>
    </main>
        </div>
  );
  }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    userSignup : PropTypes.func.isRequired
  };

export default connect(null, {userSignup})(withStyles(styles)(Signup));