// @flow
import { makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getVerticalViewMaxWidth } from '../../../filmstrip/functions.web';
import { WHITEBOARD_ASPECT_RATIO } from '../../constants';

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
    const filmstripWidth = useSelector(getVerticalViewMaxWidth);
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

    return (<div
        className = { styles.container }
        style = { dimensions }>yello</div>);
};

export default WhiteboardContainer;
