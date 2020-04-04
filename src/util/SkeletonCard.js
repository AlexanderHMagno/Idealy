import React from 'react'
import ToolTipButton from './TooltipButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Skeleton from 'react-loading-skeleton';


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
const CardIdea = ( {classes} ) => {
 
    return (

    <Card className={classes.card}>
    <div className={classes.cardInformation}>
    {/* <CardMedia image='/images/blank-profile.png' title={`loading image`} className=
    {classes.image}/> */}
    <Skeleton height={'100%'} width={200}/>
    <div className={classes.subCard}>
    <CardContent className={classes.content}>
        <Typography variant="h5" color="primary" >
        <Skeleton animation="wave" width="60%" />
        </Typography>
        <Typography variant="body2" color="textSecondary" >
        <Skeleton animation="wave"  width="50%" />
        </Typography>
        <Typography variant="body1" >
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        </Typography>
    </CardContent>
    <CardActions>
    <div className={classes.actionMenu}>
        <ToolTipButton toolTitle="Likes">
            <Skeleton circle={true} width={40} height={40} />
        </ToolTipButton>
        
        <ToolTipButton toolTitle="comment">
            <Skeleton circle={true} width={40} height={40} />
        </ToolTipButton>
        <Skeleton/>
        <ToolTipButton toolTitle="comment">
            <Skeleton circle={true} width={40} height={40} />
        </ToolTipButton>
    </div>

      </CardActions>
    </div>
    </div>
</Card>)}

const SkeletonCard = ({classes}) => {
    let display = Array.from({length: 5}, (v, i) => i) 
    return (
        <div>
            {display.map((phantom) => {
                return (
                    <CardIdea  key={phantom} classes={classes}/>
                )
            })}
            
        </div>
    )
}

export default withStyles(styles)(SkeletonCard)
