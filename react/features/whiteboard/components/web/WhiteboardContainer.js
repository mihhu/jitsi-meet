// @flow
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVerticalViewMaxWidth } from '../../../filmstrip/functions';
import { saveInitialDimensions } from '../../actions';
import { WHITEBOARD_ASPECT_RATIO } from '../../constants';
import { getInitialWhiteboardDimensions } from '../../functions';

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
    const filmstripWidth = useSelector(getVerticalViewMaxWidth);
    const initialDimensions = useSelector(getInitialWhiteboardDimensions);
    const { clientHeight, clientWidth } = useSelector(state => state['features/base/responsive-ui']);
    const dimensions = useMemo(() => {
        const maxWidth = clientWidth - filmstripWidth;
        const aspectRatioHeight = maxWidth / WHITEBOARD_ASPECT_RATIO;

        if (aspectRatioHeight <= clientHeight) {
            return {
                width: maxWidth,
                height: aspectRatioHeight,
                left: 0,
                top: (clientHeight - aspectRatioHeight) / 2
            };
        }

        return {
            height: clientHeight,
            width: clientHeight * WHITEBOARD_ASPECT_RATIO,
            top: 0,
            left: (maxWidth - (clientHeight * WHITEBOARD_ASPECT_RATIO)) / 2
        };
    }, [ filmstripWidth, clientHeight, clientWidth ]);

    // const [ tool, setTool ] = useState('pencil');

    useEffect(() => {
        if (!initialDimensions && dimensions) {
            dispatch(saveInitialDimensions(dimensions));
        }
    }, []);

    return (
        <div
            className = { styles.container }
            style = { dimensions }>
            <Whiteboard
                dimensions = { dimensions }
                tool = { 'pencil' } />
            <WhiteboardToolbar height = { dimensions.height } />
        </div>
    );
};

export default WhiteboardContainer;
