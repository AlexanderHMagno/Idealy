import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import Proptypes from 'prop-types';
import ToolTipButton from '../util/TooltipButton';
import Swal from 'sweetalert2';
import Idea from './Idea';
import CardIdea from '../util/Card';

//icons
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

//redux 
import {connect} from 'react-redux';
import {LikeScream, UnLikeScream, DeleteScream} from '../redux/actions/dataActions';



const styles = (theme) => ({
    ...theme.additional,
}
)
const Screams = (props) => {
    const {
        classes, 
        scream :{
            userHandle, screamId
        },
        user:{
            authenticated,
            likes,
            credentials:{handle}
        },
        LikeScream,
        UnLikeScream,
        DeleteScream
    } = props;
    //is liked
    let screamIsLiked = likes && likes.find(like=> like.screamId === screamId);
    // is user the owner 
    let owner = handle === userHandle;

    const handleLike = () => {
        LikeScream(screamId);
    }
    const handleUnlike = () => {
        UnLikeScream(screamId)
    }   
    const handleDelete = async () => {
        const dismiss = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
          })
        if (dismiss.value) {
            const deleting = await DeleteScream(screamId);
            if (deleting.resolved) {
                Swal.fire(
                    'Deleted!',
                    'Your idea has been deleted.',
                    'success'
                  )
            } else {
                Swal.fire(
                    'OOPS!',
                    'Something went wrong, please try it later',
                    'error'
                  )
            }   
        }
    }
    
    //like icon to show depending of the aunthentication and if the scream is liked or not
    let actionIcon = !authenticated? 
        (
            <Link to ='/login'>
                <ToolTipButton toolTitle="Like" >
                    <EmojiObjectsIcon/>
                </ToolTipButton>
            </Link>
            ): screamIsLiked? 
            (<ToolTipButton toolTitle="Unlike" onClick={handleUnlike} >
                <EmojiObjectsIcon style={{ color: 'FFAA1D' }}/>
            </ToolTipButton>
            ):
            (<ToolTipButton toolTitle="Like" onClick={handleLike} >
                <EmojiObjectsIcon/>
            </ToolTipButton>
        )
    let menuComments = authenticated ? <Idea scream={props.scream} actionIcon={actionIcon}/>:'';
    return (
    
        <CardIdea 
        scream={props.scream} 
        actionIcon={actionIcon} 
        componentIdea={
            menuComments} 
        >
            {owner &&( 
            <div className={classes.deleteArea}>
            <ToolTipButton toolTitle="Delete" onClick={handleDelete}
            btnClassName={classes.deleteButton}>
                <DeleteOutlineIcon color="secondary"/>
            </ToolTipButton>
            </div>
            )}
        </CardIdea>

)
}

Screams.prototypes = {
    classes: Proptypes.object.isRequired,
    LikeScream: Proptypes.func.isRequired, 
    UnLikeScream: Proptypes.func.isRequired,
    DeleteScream: Proptypes.func.isRequired,
    user: Proptypes.object.isRequired,
    scream: Proptypes.object.isRequired
}

const mapStateToProps = (store) => ({
    user: store.user,
})

const mapActionsToProps = {
    LikeScream,
    UnLikeScream,
    DeleteScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Screams));
