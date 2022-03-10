// @flow

import { makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { IconCloseX } from '../../../base/icons';
import { changeColor, clearWhiteboard } from '../../actions';

import WhiteboardToolbarButton from './WhiteboardToolbarButton';

const useStyles = makeStyles(theme => {
    return {
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: theme.palette.ui02,
            display: 'flex',
            flexDirection: 'column'
        },

        colorInput: {
            width: '30px',
            height: '30px',
            border: 0,
            borderRadius: '4px',
            padding: 0,
            margin: '4px'
        }
    };
});

const WhiteboardToolbar = () => {
    const styles = useStyles();
    const dispatch = useDispatch();

    const handleClear = useCallback(() => {
        dispatch(clearWhiteboard());
    }, []);

    const handleColorChange = useCallback(e => {
        dispatch(changeColor(e.target.value));
    }, []);

    return (<div className = { styles.container }>
        <WhiteboardToolbarButton
            icon = { IconCloseX }
            onClick = { handleClear }
            tooltip = { 'Clear' } /** TODO - lang. */ />
        <WhiteboardToolbarButton
            tooltip = { 'Color' } /** TODO - lang. */>
            <input
                className = { styles.colorInput }
                name = 'color'
                onChange = { handleColorChange }
                type = 'color' />
        </WhiteboardToolbarButton>
    </div>);
};

export default WhiteboardToolbar;
