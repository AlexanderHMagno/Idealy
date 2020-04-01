import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const TooltipButton = ({toolTitle, children, onClick, btnClassName, tipClassName}) => {
    return (
    <Tooltip title={toolTitle} placement="top" className={tipClassName}>
    <IconButton onClick={onClick} className={btnClassName}> 
        {children}
    </IconButton>
    </Tooltip>
)}


export default TooltipButton;