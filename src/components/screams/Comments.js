import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
import logo from '../../images/flaticon.png';

//mui
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography  from '@material-ui/core/Typography';



const styles = (theme) => ({
    ...theme.additional,
    Comments: {
        display: 'flex',
        minWidth: '80%'
    },
    avatar: {
        alignSelf: 'center',
        margin: '20px',
    },
    infoComments : {
        display: 'flex',
        flexDirection: 'column'
    }
})

const Comments = (props) => {
    dayjs.extend(relativeTime)
    const {data:{imageUrl, userHandle, createdAt, body}, classes, title} = props;
    return (
        <div className={classes.Comments}>
            <Avatar src={imageUrl||logo} className={classes.avatar} component={Link} to ={`/user/${userHandle}`}/>
            <div className={classes.infoComments}>
            <Typography variant="h6" color="primary">
                    {title}
                </Typography>
                <Typography variant="h6" color="primary" component={Link} to={`/user/${userHandle}`}>
                    {userHandle}
                </Typography>
                <Typography variant="caption">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body2">
                    {body}
                </Typography> 

            </div>
        </div>
    )
}

export default withStyles(styles)(Comments);
