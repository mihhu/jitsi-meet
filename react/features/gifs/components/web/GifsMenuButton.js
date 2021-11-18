// @flow

import { makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showOverflowDrawer } from '../../../toolbox/functions.web';
import { toggleGifsMenuVisibility } from '../../actions';

import GifToolbarButton from './GifToolbarButton';
import GifsMenuPopup from './GifsMenuPopup';


declare var APP: Object;

const useStyles = makeStyles(() => {
    return {
        container: {
            display: 'inline-block',
            position: 'relative'
        }
    };
});

/**
 * Button used for the gifs menu.
 *
 * @param {Object} props - Component props.
 * @returns {ReactElement}
 */
function GifsMenuButton(props) {

    const styles = useStyles();
    const dispatch = useDispatch();
    const overflowDrawer = useSelector(showOverflowDrawer);

    const handleClick = useCallback(e => {
        e && e.stopPropagation();
        dispatch(toggleGifsMenuVisibility());
    }, [ dispatch ]);

    return overflowDrawer
        ? <GifToolbarButton { ...props } />
        : (
            <div className = { styles.container }>
                <GifsMenuPopup handleClick = { handleClick }>
                    <GifToolbarButton />
                </GifsMenuPopup>
            </div>
        );
}

export default GifsMenuButton;
