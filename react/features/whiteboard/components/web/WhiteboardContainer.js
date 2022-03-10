// @flow
import { makeStyles } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVerticalViewMaxWidth } from '../../../filmstrip/functions.web';
import { clearWhiteboard } from '../../actions';
import { WHITEBOARD_ASPECT_RATIO } from '../../constants';

import Whiteboard from './Whiteboard';
import WhiteboardToolbar from './WhiteboardToolbar';

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'absolute',
            backgroundColor: '#fff',
            top: 0
        }
    };
});

const WhiteboardContainer = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [ tool, setTool ] = useState('pencil');
    const filmstripWidth = useSelector(getVerticalViewMaxWidth);
    const { clientHeight, clientWidth } = useSelector(state => state['features/base/responsive-ui']);
    const dimensions = useMemo(() => {
        const maxWidth = clientWidth - filmstripWidth;
        const aspectRatioHeight = maxWidth / WHITEBOARD_ASPECT_RATIO;

        if (aspectRatioHeight <= clientHeight) {
            return {
                width: maxWidth,
                height: aspectRatioHeight

                // left: 0,
                // top: (clientHeight - aspectRatioHeight) / 2
            };
        }

        return {
            height: clientHeight,
            width: clientHeight * WHITEBOARD_ASPECT_RATIO

            // top: 0,
            // left: (maxWidth - (clientHeight * WHITEBOARD_ASPECT_RATIO)) / 2
        };
    }, [ filmstripWidth, clientHeight, clientWidth ]);

    const handleClear = useCallback(() => {
        dispatch(clearWhiteboard());
    }, [ clearWhiteboard, dispatch ]);

    const handleSelectTool = useCallback(event => {
        setTool(event.target.getAttribute('tool'));
    }, []);

    return (
        <div
            className = { styles.container }
            style = { dimensions }>
            <Whiteboard
                dimensions = { dimensions }
                tool = { tool } />
            <WhiteboardToolbar
                clear = { handleClear }
                selectTool = { handleSelectTool } />
        </div>
    );
};

export default WhiteboardContainer;
