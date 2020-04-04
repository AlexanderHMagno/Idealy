import React from 'react';

//mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Skeleton from 'react-loading-skeleton';

const styles = (theme)=> ({
  ...theme.additional,
  
})

const SkeletonProfile = ({classes}) => {

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <Skeleton circle={true} width={180} height={180} />
                </div>
                <hr/>
                <div className="profile-details">
                <Skeleton animation="wave"  width="20%" />
                <hr/>
                <Skeleton animation="wave" width="60%" />
                <hr/>
                <Skeleton animation="wave"  width="20%" />
                <hr/>
                <Skeleton animation="wave"  width="50%" />
                <hr/>
                <Skeleton animation="wave"  width="30%" />
                </div>
            </div>
        </Paper>
    )
};


export default (withStyles(styles)(SkeletonProfile)) ;
