import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Proptypes from 'prop-types';
import ToolTipButton from '../util/TooltipButton';
import Swal from 'sweetalert2'

//icons
import ChatICon from '@material-ui/icons/Chat';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
//redux 
import {connect} from 'react-redux';
import {LikeScream, UnLikeScream, DeleteScream} from '../redux/actions/dataActions';



const styles = (theme) => ({
    ...theme.additional,
    card: {
        display: 'flex',
        marginBottom:20
    },
    subCard: {
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding:25
    },
    actionMenu : {
        display: 'flex',
        marginTop:10,
        alignItems: 'center',

        '& span' :{
            fontSize :'0.8rem',
        },
    },
    deleteArea : {
        flex:1,
        position:'relative'
    },
    deleteButton : {
        position: 'absolute',
        right: 0
    }
}
)
const Screams = (props) => {
    console.log(props)
    const {
        classes, 
        scream :{
            body, createdAt, imageUrl,userHandle, likesCount, commentCount,screamId
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
        console.log(classes)
        const dismiss = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          })
          console.log(dismiss)
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

    dayjs.extend(relativeTime)
    return (
<Card className={classes.card}>
    <CardMedia image={imageUrl} title="Profile image" className=
    {classes.image}/>
    <div className={classes.subCard}>
    <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary" >
        {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary" >
        {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" >
        {body}
        </Typography>
    </CardContent>
    <CardActions>
    <div className={classes.actionMenu}>
        {actionIcon}
        <span> {likesCount} likes</span>
        <ToolTipButton toolTitle="comment">
            <ChatICon color="primary"/>
        </ToolTipButton>
        <span>{commentCount} comments</span>
        </div>

      </CardActions>
    </div>
    {owner &&( 
        <div className={classes.deleteArea}>
        <ToolTipButton toolTitle="Delete" onClick={handleDelete}
        btnClassName={classes.deleteButton}>
            <DeleteOutlineIcon color="secondary"/>
        </ToolTipButton>
        </div>
    )}
</Card>
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
