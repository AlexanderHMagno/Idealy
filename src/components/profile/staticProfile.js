import React from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayJs from 'dayjs';

//redux
import {connect} from 'react-redux';
import {uploadImage,logoutUser} from '../../redux/actions/userActions';

//mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const styles = (theme)=> ({
  ...theme.additional,
  
})

const staticProfile = (props) => {
    const {
        classes,
        credentials:{monkeyCredentials},
        user:{
            authenticated, 
            },
    } = props;
    
    if (!monkeyCredentials) return <p>...loading this</p>;
    const {createdAt, location, website, handle, bio, imageUrl} = monkeyCredentials;
    if (!authenticated) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center" className={classes.topTitle}>
                    User not Found, Please Login
                </Typography>
                <div className={classes.buttons}>
                <Button 
                    type="submit" 
                    component={Link}
                    to={'/login'}
                    variant="contained" 
                    color="primary" 
                    className={classes.button}>
                        signin
                    </Button>
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary" 
                    component={Link}
                    to={'/signup'}
                    className={classes.button}>
                        signUp
                    </Button>
                    </div>
            </Paper>
        )
    
    } 
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} className="profile-image" alt="profile"/> 
                </div>
                <hr/>
                <div className="profile-details">
                <MuiLink component={Link} to={`/user/${handle}`} color="primary" vairant="h5">
                    @{handle}
                </MuiLink>
                <hr/>
                {bio && 
                    <>
                        <Typography variant="body2">
                            {bio}
                        </Typography>
                        <hr/>
                    </>}
                {location && 
                    <>
                    <LocationOnIcon color="primary"/>
                    <span>{location}</span>
                    <hr/>
                </>}
                {website && 
                    <><LinkIcon color ="primary"/>
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {" "} {website}
                        </a>
                        <hr/>
                </>}

                {createdAt && 
                    <>  
                        <InsertInvitationIcon color="primary"/>{" "}
                        <span>Joined {dayJs(createdAt).format("MMM YYYY")}</span>
                        <hr/>
                    </>}
                </div>
            </div>
        </Paper>
    )
};

staticProfile.prototype = {
    user: Proptypes.object.isRequired,
    classes: Proptypes.object.isRequired,
    uploadImage: Proptypes.func.isRequired,
    logoutUser: Proptypes.func.isRequired
}

const mapStateToProps = (store) => ({
    user: store.user
});

const mapDispatchToProps = {
    uploadImage, logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(staticProfile)) ;
