// @flow
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { getVerticalViewMaxWidth } from '../../../filmstrip/functions.web';

const useStyles = makeStyles(() => {
    return {
        container: {
            position: 'absolute',
            backgroundColor: '#fff',
            top: 0,
            width: '100%',
            height: '100%'
        }
    };
});

const WhiteboardContainer = props => {
    const styles = useStyles();
    const filmstripWidth = useSelector(getVerticalViewMaxWidth);

    return <div className = { styles.container }>yello</div>;
};

export default WhiteboardContainer;
