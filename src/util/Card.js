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


const styles = () => ({
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
})
const CardIdea = ( props ) => {
    const {
        classes,
        staticCard,
        scream:{imageUrl,userHandle,createdAt,body, likesCount, commentCount},
        actionIcon,
        componentIdea,
    children} = props;

    dayjs.extend(relativeTime)
    

    return (<Card className={[classes.card, staticCard]}>
    <CardMedia image={imageUrl} title={`${userHandle} image`} className=
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
        {componentIdea}
    </div>

      </CardActions>
    </div>
    {children}
</Card>)}


export default withStyles(styles)(CardIdea);