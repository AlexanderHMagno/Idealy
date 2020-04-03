import React from 'react'
import {Link} from 'react-router-dom';
import ToolTipButton from './TooltipButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatICon from '@material-ui/icons/Chat';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Swal from 'sweetalert2';
import logo from '../images/flaticon.png';

import {connect} from 'react-redux';
import {addNewComment} from '../redux/actions/dataActions';



const styles = () => ({
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom:20
    },
    cardInformation: {
        display: 'flex'
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
})
const CardIdea = ( props ) => {
    const {
        classes,
        scream:{imageUrl,userHandle,createdAt,body, likesCount, commentCount,screamId},
        actionIcon,
        componentIdea,
        addNewComment,
        authenticated,
    children} = props;
    
    const handleNewComment = async () => {
        try {
            let modal = document.getElementsByClassName('MuiDialog-scrollPaper')[0];
            if (modal) {
                modal.removeAttribute('tabindex')
            }
            
            const { value: text } = await Swal.fire({
                title:`<span><img class='postImageTitle' src=${logo} alt="logo"/> Add a Comment</span>`,
                input: 'textarea',
                inputPlaceholder: 'Type your comment here...',
                inputAttributes: {
                  'aria-label': 'Type your comment here'
                },
                inputAutoTrim:true,
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                      if (value) {
                        resolve()
                      } else {
                        resolve('Please add a comment')
                      }
                    })
                  }
              })
              if (text) {
                addNewComment({screamId, body: text});
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    customClass: {container: 'topInformation'},
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Adding'
                  })
              }
        } catch (err) {
            console.log(err)
        }
        // addNewComment(screamId);
    }
    dayjs.extend(relativeTime)
    

    return (<Card className={classes.card}>
    <div className={classes.cardInformation}>
    <CardMedia image={imageUrl} title={`${userHandle} image`} className=
    {classes.image}/>
    <div className={classes.subCard}>
    <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary" >
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
        {authenticated &&
        <ToolTipButton toolTitle="comment" onClick= {handleNewComment}>
            <ChatICon color="primary"/>
        </ToolTipButton>
        }
        {!authenticated && 
            <Link to ='/login'>
                <ToolTipButton toolTitle="comment">
                    <ChatICon color="primary"/>
                </ToolTipButton>
            </Link>
        }   
        <span>{commentCount} comments</span>
        {componentIdea}
    </div>

      </CardActions>
    </div>
    </div>
    {children}
</Card>)}


export default connect(null, {addNewComment})(withStyles(styles)(CardIdea));