// @flow

import { makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconCloseX, IconLiveStreaming } from '../../../base/icons';
import { isLocalParticipantModerator } from '../../../base/participants';
import { changeColor, clearWhiteboard, syncAllWhiteboards } from '../../actions';

import WhiteboardToolbarButton from './WhiteboardToolbarButton';

type Props = {
    height: number
}

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
        },

        dragHandle: { // ! reuse styles
            width: '30px',
            height: '4px',
            margin: '4px',
            marginTop: '6px',
            border: 0,
            backgroundColor: theme.palette.icon01,
            cursor: 'grab'
        }
    };
});

const WhiteboardToolbar = ({ height }: Props) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const toolbarRef = useRef();
    const [ drag, setDrag ] = useState({
        on: false,
        initialPosition: 0
    });
    const [ top, setTop ] = useState(0);
    const moderator = useSelector(isLocalParticipantModerator);

    const handleClear = useCallback(() => {
        dispatch(clearWhiteboard());
    }, []);

    const handleColorChange = useCallback(e => {
        dispatch(changeColor(e.target.value));
    }, []);

    const handleSyncAll = useCallback(() => {
        dispatch(syncAllWhiteboards());
    }, []);

    const startDrag = useCallback(e => setDrag({
        on: true,
        initialPosition: e.clientY
    }), []);

    const endDrag = useCallback(() => setDrag(false), []);

    const handleDrag = useCallback(e => {
        if (drag.on) {
            const maxTop = height - toolbarRef.current.offsetHeight;
            const newTop = e.clientY - drag.initialPosition;

            setTop(Math.max(0, Math.min(maxTop, newTop)));
        }
    }, [ drag, top ]);

    useEffect(() => {
        window.addEventListener('mousemove', handleDrag);

        return () => window.removeEventListener('mousemove', handleDrag);
    }, [ handleDrag ]);

    useEffect(() => {
        window.addEventListener('mouseup', endDrag);

        return () => window.removeEventListener('mouseup', endDrag);
    }, []);

    return (<div
        className = { styles.container }
        ref = { toolbarRef }
        style = {{ top }}>
        {moderator && <WhiteboardToolbarButton
            icon = { IconCloseX }
            onClick = { handleClear }
            tooltip = { 'Clear' } /** TODO - lang. */ />}
        <WhiteboardToolbarButton
            tooltip = { 'Color' } /** TODO - lang. */>
            <input
                className = { styles.colorInput }
                name = 'color'
                onChange = { handleColorChange }
                type = 'color' />
        </WhiteboardToolbarButton>
        {moderator && <WhiteboardToolbarButton
            icon = { IconLiveStreaming }
            onClick = { handleSyncAll }
            tooltip = { 'Sync all' } /** TODO - lang. */ />}
        <WhiteboardToolbarButton
            tooltip = { drag.on ? null : 'Drag Handle' } /** TODO - lang. */>
            <div
                className = { styles.dragHandle }
                onMouseDown = { startDrag }
                onMouseUp = { endDrag } />
        </WhiteboardToolbarButton>
    </div>);
};

export default WhiteboardToolbar;
