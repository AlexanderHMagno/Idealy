import React, {useRef} from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayJs from 'dayjs';
import EditDetails from './EditDetails.js';
import TooltipButton from '../../util/TooltipButton';

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
import EditIcon from '@material-ui/icons/Edit';
import KeyBoardReturn from '@material-ui/icons/KeyboardReturn';


const styles = (theme)=> ({
  ...theme.additional,
  
})

const Profile = (props) => {
    const {
        classes,
        user:{
            authenticated, 
            loading, 
            credentials:{createdAt, location, website, handle, bio, imageUrl}},
        uploadImage,
        logoutUser
    } = props;

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        console.log(image)
        const formData = new FormData();
        formData.append('image',image,image.name);
        console.log(formData)
        uploadImage(formData);
    }
    const element = useRef();
    const handleTriggerImage = () => {
        element.current.click();
    }

    const handleLogout = () => {
        logoutUser();
    }
    
    if (loading) return <p>...loading this</p>;
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
                    <input type="file" id="imageInput" hidden="hidden" ref={element} onChange={handleImageChange}/> 

                <TooltipButton toolTitle={'Edit picture'} onClick={handleTriggerImage} btnClassName={'button'}>
                <EditIcon color="primary"/>
                </TooltipButton>     
                </div>
                <hr/>
                <div className="profile-details">
                <MuiLink component={Link} to={`/users/${handle}`} color="primary" vairant="h5">
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
                <div>
                <TooltipButton toolTitle={'Logout'} onClick={handleLogout}>
                    <KeyBoardReturn color="primary"/>
                </TooltipButton>   
                <EditDetails></EditDetails>
                </div>
                </div>
            </div>
        </Paper>
    )
};

Profile.prototype = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile)) ;
