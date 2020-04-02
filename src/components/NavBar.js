import React from 'react';
import Proptypes from 'prop-types';
import ToolTipButton from '../util/TooltipButton';
import {Link} from 'react-router-dom';
import PostIdea from './PostIdea';
import logo from '../images/flaticon.png';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
//icons
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyBoardReturn from '@material-ui/icons/KeyboardReturn';



//redux 
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userActions';

const styles = () => ({
    image: {
        position: 'absolute',
        left: '5%',
        top: '10%',
        height: '80%'
    }
})
const NavBar = ({auth, logoutUser, classes}) => {
    const handleLogout = () => {
        logoutUser()
    }
    return (
        <div>
            <AppBar>
            <img className={classes.image} src={logo} alt="logo"/>
            <ToolBar className="nav-container">
                
                {!auth &&  
                <>
                <Button color="inherit" component={Link} to ="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to ="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to ="/signup">
                    SignUp
                </Button>
                </> 
                }
                {auth &&  
                <>

                <PostIdea/>
                <Link to="/">
                <ToolTipButton toolTitle="Home">
                    <HomeIcon></HomeIcon>
                </ToolTipButton>
                </Link>

                <ToolTipButton toolTitle="Notifications">
                    <NotificationsIcon></NotificationsIcon>
                </ToolTipButton>
                <ToolTipButton toolTitle={'Logout'} onClick={handleLogout}>
                    <KeyBoardReturn color="primary"/>
                </ToolTipButton>  
                </> 
                }
               
            </ToolBar>
            </AppBar>
        </div>
    )
    
}

NavBar.prototypes = {
    auth : Proptypes.func.isRequired
}

const mapStateToProps = (store) => ({
    auth  : store.user.authenticated 
})


export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(NavBar));
