import React, {Component} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import routes from './router/router';
import {
  Button,
  TextField,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  makeStyles
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const jwtToken = localStorage.token;
const isValidUrl = 'http://54.234.217.249:80/api/isValid'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        open:false,
    };
  }

  checkIsLogin = (token, isValidUrl) =>{
    console.log(jwtToken)
    if(jwtToken==""||jwtToken==null||jwtToken==undefined){
        // this.setState({open: true})
    } 
    if (token) {
        return fetch(isValidUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            if(!data.success){
                // this.setState({open: true})
            }
        })
    }

}
  componentDidMount () {
    this.checkIsLogin(jwtToken, isValidUrl);
}
  render(){
    return (
      <div className="App">
        <Switch>
          {
            routes.map(route =>{
              return (
                <Route
                  key = {route.path}
                  path = {route.path}
                  component = {route.component} />
              ) 
            })
          }
          <Redirect to = {routes[1].path} />
          
        </Switch>

        <Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Login Reminder"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Your login has expired, please login again!
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleSkipToLogin} color="primary">
                Login
            </Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
