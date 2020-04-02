import React from 'react';
import Proptypes from 'prop-types';
import CardIcon from '../util/Card';
import CommentsGroup from './Comments';
//mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  withStyles  from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
//icons
import ToolTipButton from '../util/TooltipButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//redux
import {connect} from 'react-redux';
import {getScream} from '../redux/actions/dataActions';


const styles = (theme) => ({
    ...theme.additional,
    dialogContent : {
        display : 'flex',
    },
    commentLoader :{
        left: '45%',
        position: 'absolute',
    },
    fixedScream: {
        position: 'sticky',
        top: 0,
    }
})

const IdeaScream = (props) => {

    const {scream, classes, actionIcon, getScream, data:{scream:{comments}}, UI:{loading}} = props;
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const descriptionElementRef = React.useRef(null);
  console.log(comments, loading)
  React.useEffect(() => {
      
    if (open) {
        getScream(scream.screamId)

      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  let loadedComments = !loading ? comments.map((comment, index) => <CommentsGroup key={index} data={comment}/> ):<CircularProgress className={classes.commentLoader}/>;
  if (!loadedComments.length && !loading) loadedComments = <CommentsGroup title='Ideally' data={{body:'Be the first one to comment on this idea'}}/>
  return (
    <div>
      <ToolTipButton toolTitle="expand" onClick={handleClickOpen}>
            <ExpandMoreIcon color="primary"/>
        </ToolTipButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}  
      >
        <DialogTitle id="scroll-dialog-title">
            <CardIcon scream={scream} actionIcon={actionIcon} staticCard={classes.fixedScream}
            componentIdea = {
                <ToolTipButton toolTitle="close" onClick={handleClose}>
                    <ExpandMoreIcon color="secondary"/>
                </ToolTipButton>
            }
            >
            </CardIcon>
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
              {loadedComments}
          </DialogContentText>
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


IdeaScream.proptype = {
    classes : Proptypes.object.isRequired,
    data : Proptypes.object.isRequired,
    UI : Proptypes.object.isRequired,
    getScream : Proptypes.func.isRequired
}

const mapStateToProps = (store) => ({
    data : store.data,
    UI: store.UI
})

const mapActionsToProps = {
    getScream
}


export default connect(mapStateToProps,mapActionsToProps )(withStyles(styles)(IdeaScream))