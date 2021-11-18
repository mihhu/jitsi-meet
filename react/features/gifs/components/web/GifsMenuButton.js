// @flow

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showOverflowDrawer } from '../../../toolbox/functions.web';
import { toggleGifsMenuVisibility } from '../../actions';

import GifToolbarButton from './GifToolbarButton';
import GifsMenuPopup from './GifsMenuPopup';


declare var APP: Object;

/**
 * Button used for the gifs menu.
 *
 * @param {Object} props - Component props.
 * @returns {ReactElement}
 */
function GifsMenuButton(props) {
    const dispatch = useDispatch();

    const handleClick = useCallback(e => {
        e && e.stopPropagation();
        dispatch(toggleGifsMenuVisibility());
    }, [ dispatch ]);

    const overflowDrawer = useSelector(showOverflowDrawer);

    return (
        <GifsMenuPopup handleClick = { handleClick }>
            <GifToolbarButton
                handleClick = { !overflowDrawer && handleClick }
                { ...props } />
        </GifsMenuPopup>
    );
}

export default GifsMenuButton;
