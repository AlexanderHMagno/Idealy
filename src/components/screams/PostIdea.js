import React from 'react';
import Proptypes from 'prop-types';
import Swal from 'sweetalert2';
import logo from '../../images/flaticon.png';
//Mui
import ToolTipButton from '../../util/TooltipButton';
import withStyles from '@material-ui/core/styles/withStyles';
//icons 
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
//redux 
import {connect} from 'react-redux';
import {postScream} from '../../redux/actions/dataActions';


const styles = (theme) => ({
    ...theme.additional,
    '.postImageTitle': {
      position: 'absolute',
      left: '5%',
      top: '10%',
      height: '80%'
  }

})
const PostIdea = (props) => {
    const {postScream} = props;
    const postForm = async () => {
        try {
            const { value: text } = await Swal.fire({
                title:`<span><img class='postImageTitle' src=${logo} alt="logo"/> Add an idea</span>`,
                input: 'textarea',
                inputPlaceholder: 'Type your idea here...',
                inputAttributes: {
                  'aria-label': 'Type your idea here'
                },
                inputAutoTrim:true,
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                      if (value) {
                        resolve()
                      } else {
                        resolve('Please add an Idea')
                      }
                    })
                  }
              })
              if (text) {
                postScream(text);
              }
        } catch (err) {
            console.log(err)
        }
    
    }
    
    return (
        <ToolTipButton toolTitle="Add an Idea" onClick={postForm}>
          <EmojiObjectsIcon/>
        </ToolTipButton>
    )
}

PostIdea.prototypes = {
    classes: Proptypes.object.isRequired
}

const mapStateToProps = (store) => ({

})

const mapActionsToProps = {
    postScream
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(PostIdea));