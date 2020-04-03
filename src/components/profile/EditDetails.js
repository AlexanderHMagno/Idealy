import React, {useState} from 'react';
import Proptypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions';
import ToolTipButton from '../../util/TooltipButton';

//dialog 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme)=> ({
  ...theme.additional,
  TextField:{
      marginTop:20
  },
  button :{
      margin:0
  }
})
const EditDetails = (props) => {
    const {classes, credentials, editUserDetails} = props;
    const [bio, setBio] = useState(credentials.bio);
    const [website, setWebsite] = useState(credentials.website);
    const [location, setLocation] = useState(credentials.location);
    const [open, setOpen] = useState(false);

    const toggleDialog =() => {
        setOpen(!open);
    }
    const handleOnChange = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'bio':
                    setBio(value);
                break;
            case 'website':
                    setWebsite(value);
                break; 
            case 'location':
                setLocation(value);
            break;
            default:
            break;
        }
    }

    const handleSubmit = () => {
        editUserDetails( {bio,website,location});
        toggleDialog();
    }
    return (
        <>
        <ToolTipButton 
        toolTitle={"Edit details"}
        onClick={toggleDialog}
        btnClassName={classes.button}
        > 
        <EditIcon color="primary"/>
        </ToolTipButton>
        <Dialog
        open={open}
        onClose={toggleDialog}
        
        maxWidth='xs'
        >
            <DialogTitle>Edit your details</DialogTitle>
            <DialogContent>
                <form>    
                    <TextField 
                    name="website"
                    label="Website" 
                    type="text"
                    placeholder="Your Personal/Professional website"
                    className={classes.TextField}
                    value={website}
                    onChange={handleOnChange}
                    fullWidth/>
                    
                    <TextField 
                    name="location"
                    label="Location" 
                    type="text"
                    placeholder="Where do you live"
                    className={classes.TextField}
                    value={location}
                    onChange={handleOnChange}
                    fullWidth/>

                    <TextField 
                    name="bio"
                    label="Bio" 
                    type="text"
                    multiline
                    rows="3"
                    placeholder="A short bio about yourself"
                    className={classes.TextField}
                    value={bio}
                    onChange={handleOnChange}
                    fullWidth/>     
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleDialog} color="primary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

EditDetails.prototype = {
    classes: Proptypes.object.isRequired,
    credentials: Proptypes.object.isRequired,
    editUserDetails: Proptypes.func.isRequired

}

const mapStateToProps = (store) => ({
    credentials: store.user.credentials
})

const mapActionsToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));