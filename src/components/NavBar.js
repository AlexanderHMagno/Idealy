import React from 'react';
import Proptypes from 'prop-types';
import ToolTipButton from '../util/TooltipButton';
import {Link} from 'react-router-dom';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

//redux 
import {connect} from 'react-redux';
const NavBar = ({auth}) => {

    return (
        <div>
            <AppBar>
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

                <ToolTipButton toolTitle="Post an Idea">
                    <AddIcon></AddIcon>
                </ToolTipButton>
                <Link to="/">
                <ToolTipButton toolTitle="Home">
                    <HomeIcon></HomeIcon>
                </ToolTipButton>
                </Link>

                <ToolTipButton toolTitle="Notifications">
                    <NotificationsIcon></NotificationsIcon>
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

export default connect(mapStateToProps)(NavBar)
