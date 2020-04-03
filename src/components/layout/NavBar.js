import React from 'react';
import Proptypes from 'prop-types';
import ToolTipButton from '../../util/TooltipButton';
import {Link} from 'react-router-dom';
import PostIdea from '../screams/PostIdea';
import logo from '../../images/flaticon.png';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import ToolTips from '@material-ui/core/Tooltip'
//icons
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyBoardReturn from '@material-ui/icons/KeyboardReturn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';



//redux 
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userActions';

const styles = () => ({
    image: {
        position: 'absolute',
        left: '5%',
        top: '10%',
        height: '80%'
    }
})
const NavBar = ({user, logoutUser, classes}) => {

    const {authenticated ,credentials :{handle}} = user
    const handleLogout = () => {
        logoutUser()
    }
    return (
        <div>
            <AppBar>
            <ToolTips title="Ideally">
                <img className={classes.image} src={logo} alt="logo"/>
            </ToolTips>
            
            <ToolBar className="nav-container">
                
                {!authenticated &&  
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
                {authenticated &&  
                <>

                <PostIdea/>
                <Link to={`/user/${handle}`}>
                <ToolTipButton toolTitle="My Ideas">
                    <AssignmentIndIcon></AssignmentIndIcon>
                </ToolTipButton>
                </Link>
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
    user : Proptypes.func.isRequired
}

const mapStateToProps = (store) => ({
    user  : store.user
})


export default connect(mapStateToProps, {logoutUser})(withStyles(styles)(NavBar));
