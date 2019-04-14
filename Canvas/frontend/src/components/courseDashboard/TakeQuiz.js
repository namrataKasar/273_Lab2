import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography, Button, Paper, TextField, AppBar, Tabs, Tab} from '@material-ui/core';
import {Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, FormHelperText, Input, InputLabel} from '@material-ui/core';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as quizData from '../../actions/quizAction';

const styles = theme => ({
  root1: {
    boxShadow: 'none',
    width: '100%',
    marginTop: theme.spacing.unit * 5,
},
root: {
  boxShadow: 'none',
  width: '100%',
  marginTop: theme.spacing.unit * 10,
},
formControl: {
  margin: theme.spacing.unit * 3,
},
group: {
  margin: `${theme.spacing.unit}px 0`,
},
nested: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
bgPaper: {
    padding: '4px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #D3D3D3'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  listItem: {
    background: 'white',
    border: '1px solid gray',
    margin: '0px',
    padding: '0px'
  },
  listItemText: {
    margin: '16px'
  },
  divider: {
    border: '1px dashed black'
  },
  textColor1:{
    color: '#008ee2',
  },
  paperClass:{
    marginTop: 20,
    overflowX: "auto",
    padding: '0% 5% 5%'
  },
  button: {
    margin: theme.spacing.unit * 4 ,
  },
  fullWidth: {
    width: '100%',
    // float: 'left'
  },
  textField: {
      marginLeft: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      marginBottom: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 5,
      width: '90%',
        
    },
    textField2: {
        marginLeft: 32,
        //marginRight: theme.spacing.unit * 3,
        width: '95%',
    },
    successMsg : {
      color: 'green',
      fontSize: 'x-large',
      fontWeight: 'bold',
    }
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


class Quizzes extends React.Component {
  state = {
    is_student: '',
    questionsList : '',
    answerList: [],
    answer: '',
    quizScore: '',
    message: ''
  };

  componentWillMount = () => {
    const propsData = this.props.quizData.CourseReducer.CourseReducer;
    const quizIndex = this.props.location.quizIndex;
    
    console.log(propsData.quizzes[quizIndex].QUESTIONS);
    this.setState({
      questionsList : propsData.quizzes[quizIndex].QUESTIONS,
      answerList : new Array(propsData.quizzes[quizIndex].QUESTIONS.length),
      is_student : this.props.quizData.LoginReducer.LoginReducer.is_student
    })

    console.log(this.state.answerList);
    
  }


  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleChange = (text, e) => {
    this.setState({ 
      answer : e.target.value
    });
    console.log("Hello");
    console.log(text);
    this.state.answerList[text] = e.target.value;
    this.forceUpdate();
  };



 handleRadioChange = event => {
  this.setState({ selectedOption: event.target.value });
};

submitQuiz = (e) => {
  e.preventDefault();
  console.log("Hello");
  console.log(this.state.answerList);

  let count = 0;
  for(let i = 0; i<this.state.answerList.length; i++)
  {
    if(this.state.answerList[i] === this.state.questionsList[i].ANSWER)
    {
      count = count + 1;
    }
  }
  this.setState({
    quizScore : count*2,
    message: "Your Score is " + count*2 + " out of 10",
  })
}

  render() {
    const { classes, theme } = this.props;
    const header = "Quiz"
    return (
      <div style={{marginTop: '32px', width: '70%', marginLeft: '25%'}}>

        <div className={classes.root} >
            <Typography variant="h6" className={classes.textColor1} noWrap>
                {header}
            </Typography>
            
        </div>
        <Paper className={classes.paperClass}>
            <label className={classes.successMsg}>{this.state.message}</label>
              <form  className={classes.container}>
                <div>
                {Object.keys(this.state.questionsList).map((text, index) => (
                <Grid
                container
                direction="row"
                // justify="center"
                alignItems="left"
                className={classes.bgPaper}
                >
                  
                  <div style={{display: this.state.questionsList[text].QUESTION_TYPE == 'Essay Question' ? 'block' : 'none'}}>
                    <FormControl>
                      <label>{this.state.questionsList[text].QUESTION}</label>
                      <Input id={text} aria-describedby="my-helper-text" 
                      value={this.state.answerList[text]}
                      onChange={(e) => this.handleChange(text, e)}/>
                    </FormControl>
                  </div>

                  <div style={{display: this.state.questionsList[text].QUESTION_TYPE == 'Multiple Choice Question' ? 'block' : 'none'}}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">{this.state.questionsList[text].QUESTION}</FormLabel>
                        <RadioGroup
                          aria-label=""
                          name=""
                          id={text}
                          className={classes.group}
                          value={this.state.answerList[text]}
                          onChange={(e) => this.handleChange(text, e)}
                        >
                          <FormControlLabel value={this.state.questionsList[text].OPTION1} 
                            control={<Radio color="primary" />}
                            label={this.state.questionsList[text].OPTION1} />
                          <FormControlLabel value={this.state.questionsList[text].OPTION2} 
                            control={<Radio color="primary" />}
                          label={this.state.questionsList[text].OPTION2} />
                          <FormControlLabel value={this.state.questionsList[text].OPTION3} 
                            control={<Radio color="primary" />} 
                            label={this.state.questionsList[text].OPTION3} />
                          <FormControlLabel value={this.state.questionsList[text].OPTION4} 
                            control={<Radio color="primary" />} 
                            label={this.state.questionsList[text].OPTION4} />
                        </RadioGroup>
                    </FormControl>
                  </div>
                </Grid>
                ))}
                
                  <Button 
                    style={{display : this.state.is_student && (this.state.message == '') ? 'inline' : 'none'}}
                    type="submit" variant="contained" color="primary" className={classes.button}
                    // style={{display : this.state.is_student == "false" ? 'block' : 'none'}}
                    onClick={this.submitQuiz}
                    >
                      Submit Quiz
                  </Button>
                </div>
              </form>
      
          </Paper>
      </div>
    );
  }
}

Quizzes.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    quizData : state
  }
}

const mapDispacthToProps = (dispatch) => {
  return bindActionCreators(quizData, dispatch);
}
export default connect(mapStateToProps, mapDispacthToProps)(withStyles(styles, { withTheme: true })(Quizzes));