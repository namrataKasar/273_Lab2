import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import {Redirect} from 'react-router';
import {userLogin} from '../../actions/loginAction'

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
      fontWeight: '500',
      color: '#5e5e5e',
      fontSize: '17px',
      margin: '10% 0 0',
    },
    errorMsg: {
      color: 'red',
      marginTop: 15
    }
  });

class Login extends Component {
 
  state = {
      sjsuID : '',
      password : '',
      redirectVar : null,
      is_student: true,
      errorMsg: ''
  }

  handleChange = (e) => {
    this.setState({
          [e.target.name] : e.target.value,
      })
  }

  login = (e) => {
    console.log(this.state);
    e.preventDefault();
    const data = this.state;

    //store in redux store starts
    this.props.userLogin(data).then(
            (data) => {
                console.log(data);
                
                this.setState({
                  redirectVar : <Redirect to="/dashboard"/>
                })
                // alert("Successful");
            },
            (err) => {
              console.log("Hello Login Error")
              this.setState({errorMsg : "Check your credentials"})
                console.log(err.response);}

        )
        .catch( (error) => {
          console.log("Hello Login Error 2")
        });

  }

  signUp = (e) => {
    this.setState({
      redirectVar : <Redirect to="/signup"/>
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
        <h2 className={classes.infoText}>Log In</h2>
        <div className={classes.errorMsg}>
            <label>{this.state.errorMsg}</label>  
          </div>
        <form className={classes.form} onSubmit={this.login}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="number">ID</InputLabel>
            <Input id="sjsuID" name="sjsuID" onChange={this.handleChange} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password"  onChange={this.handleChange}/>
          </FormControl>         
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Login
          </Button>
         
        </form>
        </div>
        <div>
          <h2 className={classes.infoText}>Don't have an account? <a style={{color: '#0055a2'}} href="/signup">Sign up</a> here</h2>
        </div>
      </Paper>
    </main>
        </div>
  );
  }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    userLogin : PropTypes.func.isRequired
  };



export default connect(null, {userLogin})(withStyles(styles)(Login));