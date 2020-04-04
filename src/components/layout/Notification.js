import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Proptypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import  withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';


//logos 
import ToolTipButton from '../../util/TooltipButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ChatICon from '@material-ui/icons/Chat';
//redux
import { connect } from 'react-redux';
import {markNotificationAsRead} from '../../redux/actions/userActions';
//import action


const styles = {
    menuDivider : {
        margin: '10px'
    },
    notiData :{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10
    }
}

const NotificationsGroup = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {notifications, classes, markNotificationAsRead} = props;
  const [numNotifications, setNotifications] = useState(0)
    
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeNotification = (notificationId) => {

    if(!notificationId) {
        let remove = notifications? notifications.map(noti => noti.notificationId):[];
        if (remove.length) markNotificationAsRead(remove);
    } else {
        markNotificationAsRead([notificationId])
    }
    handleClose()
  }
  
  useEffect (() =>{
      if (notifications) {
        setNotifications(notifications.length) ;
      }
  },[notifications])
 
console.log(notifications)
dayjs.extend(relativeTime)
  let GroupOfNotifications = numNotifications? 
        (notifications.map(noti => 
        
        <Link to={`/user/${noti.recipient}`}>
            <MenuItem className={classes.menuDivider} onClick={()=>removeNotification(noti.notificationId)}>
                {noti.type === 'comment'? 
                    ( <>
                        <ChatICon color="primary"/>
                        <div className={classes.notiData}>
                        <Typography color="textPrimary" variant="body2">{noti.sender} has commented your Idea</Typography>
                        <Typography color="textSecondary" variant='caption'>
                            {dayjs(noti.createdAt).fromNow()}
                        </Typography>
                        </div>
                        </>
                    ):
                    (<>
                        <EmojiObjectsIcon style={{ color: 'FFAA1D' }}/>
                        <div className={classes.notiData}>
                        <Typography color="textPrimary" variant="body2">{noti.sender} likes your Idea</Typography>
                        <Typography color="textSecondary" variant='caption'>
                            {dayjs(noti.createdAt).fromNow()}
                        </Typography>
                        </div>
                    </>
                    )
                } 
                
           </MenuItem>
        </Link>
        )):
        
        <MenuItem onClick={handleClose}>Not New Notifications</MenuItem>

  return (
    <div>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> */}
        <ToolTipButton toolTitle="Notifications" onClick={handleClick}>
        <Badge badgeContent={numNotifications} color="secondary">
            <NotificationsIcon></NotificationsIcon>
        </Badge>
            
        </ToolTipButton>
      {/* </Button> */}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {!!numNotifications && <MenuItem onClick={()=>removeNotification()}>Mark All as Read</MenuItem>}
          
          {GroupOfNotifications}
        

      </Menu>
    </div>
  );
}

NotificationsGroup.prototype ={
    classes: Proptypes.object.isRequired,
    notifications: Proptypes.object,
    markNotificationAsRead: Proptypes.func
}

const mapStateToProps = (store) => ({
    notifications : store.user.notification
})
export default connect(mapStateToProps,{markNotificationAsRead})(withStyles(styles)(NotificationsGroup))