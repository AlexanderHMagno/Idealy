import React, { useState} from 'react'
import WS from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import logo from '../images/flaticon.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// import axios from 'axios';
import {Link} from 'react-router-dom';

// redux 
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

const styles = (theme) =>({
    ...theme.additional
})

const Login = (props) => {
    const {classes,loginUser,history} = props;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {errors, loading} = props.UI;
    const handleSubmit = event => {
        event.preventDefault();
        loginUser({email,password},history); 
    }
    
    return (
       <Grid container className={classes.form}>
           <Grid item sm>
                <img className={classes.image} src={logo} alt="logo"/>
                <form noValidate onSubmit={handleSubmit}>
                 <TextField 
                 id="email" 
                 name="email" 
                 type="email"
                 label="Email" 
                 className={classes.textField} 
                 value={email} 
                 onChange ={(e)=>setEmail(e.target.value)} helperText={errors.email} 
                 error={!!errors.email} fullWidth/>

                 <TextField 
                 id="password" 
                 name="password" 
                 type="password"
                 label="Password" 
                 className={classes.textField} 
                 value={password} 
                 onChange ={(e)=>setPassword(e.target.value)} 
                 helperText={errors.password} 
                 error={!!errors.password}
                 fullWidth/>
                 {errors.general && 
                 <Typography 
                 variant="body2" 
                 className={classes.generalError}>
                     {errors.general}
                 </Typography>}
                
                   <Button 
                   type="submit" 
                   variant="contained" 
                   color="primary" 
                   disabled = {loading}
                   className={classes.button}>
                       signin
                       {loading && <CircularProgress size={30} className={classes.progress}/>}
                   </Button>
                   <br/><br/>
                   <Typography variant="caption">
                       Don't have an account? <Link to={'/signup'}>SignUp here</Link>
                   </Typography>
                </form>
           </Grid>
       </Grid>
    )
}

Login.propTypes = { 
    classes: PropTypes.object.isRequired,
    loginUser : PropTypes.func.isRequired,
    user:  PropTypes.object.isRequired,
    UI :  PropTypes.object.isRequired
}

const mapStateToProps = (store) => ({
    user: store.user,
    UI: store.UI
})

const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(WS(styles)(Login));
