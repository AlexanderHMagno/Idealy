import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import { createMuiTheme , MuiThemeProvider } from '@material-ui/core/styles';
import NavBar from './components/NavBar';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signUp';
import themeUtil from './util/theme';
import jwsDecode from 'jwt-decode';
import './App.css';
import AuthRoute from './util/AuthRoute';
//redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/userActions';
import {SET_AUTHENTICATED} from './redux/types';
import axios from 'axios';


//TODO move this to a proper folder and check how to wrap with styles
const theme = createMuiTheme(themeUtil);
const token = localStorage.FBauthToken;
// let authenticated; 
if (token) {
  const decodeToken = jwsDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    console.log('session has been destroyed')
    store.dispatch(logoutUser());
    // window.location.href = '/login';
    
    // authenticated = false;
  } else {
    console.log('running')
    store.dispatch({type: SET_AUTHENTICATED})
    // authenticated = true;
    //this line is super import because will hold the connection to
    axios.defaults.headers.common.Authorization = token;
    store.dispatch(getUserData());
    
  }
} 

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar/>
          <div className="container">
            <Switch>
              <Route path="/" component={home} exact/>
              <AuthRoute path="/login" component={login} />
              <AuthRoute path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}


export default App;
