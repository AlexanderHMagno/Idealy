import React, { useState } from 'react'
import WS from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import logo from '../images/flaticon.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
//redux
import {connect} from 'react-redux';
import {userCreation} from '../redux/actions/userActions';
// import {CLEAR_ERRORS} from '../redux/types';

const styles = (theme) => ({
    ...theme.additional
})
const SignUp = (props) => {
    console.log(props)
    const {classes, UI, history, userCreation} = props;
    const {loading, errors} = UI;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [handle,setHandle] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log( email, password,confirmPassword, handle )
        userCreation({ email, password,confirmPassword, handle },history)
    }
// //clean errors
//     useEffect(()=> {
//         dispatch({type:CLEAR_ERRORS})
    // },[handle,password,confirmPassword,email])



    return (
       <Grid container className={classes.form}>
           <Grid item sm>
                <img className={classes.image} src={logo} alt="logo"/>
                <form noValidate onSubmit={handleSubmit}>

                <TextField 
                 id="handle" 
                 name="handle" 
                 type="text"
                 label="Username" 
                 className={classes.textField} 
                 value={handle} 
                 onChange ={(e)=>setHandle(e.target.value)} helperText={errors.handle} 
                 error={!!errors.handle} fullWidth/>

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

                <TextField 
                 id="comfirmpassword" 
                 name="comfirmpassword" 
                 type="password"
                 label="Comfirm Password" 
                 className={classes.textField} 
                 value={confirmPassword} 
                 onChange ={(e)=>setConfirmPassword(e.target.value)} 
                 helperText={errors.confirmPassword} 
                 error={!!errors.confirmPassword}
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
                       signup
                       {loading && <CircularProgress size={30} className={classes.progress}/>}
                   </Button>
                   <br/><br/>
                   <Typography variant="caption">
                       Do you have an account? <Link to={'/login'}>Login here</Link>
                   </Typography>
                </form>
           </Grid>
       </Grid>
    )
}

SignUp.propTypes = { 
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    userCreation: PropTypes.func.isRequired
}

const mapStateToProps = (store) => ({
    user: store.user,
    UI : store.UI
});

const mapDispatchToProps = {
    userCreation
}
export default connect(mapStateToProps, mapDispatchToProps)(WS(styles)(SignUp));
