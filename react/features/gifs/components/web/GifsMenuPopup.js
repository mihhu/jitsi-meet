// @flow
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';

import { Popover } from '../../../base/popover';
import { showOverflowDrawer } from '../../../toolbox/functions.web';
import { getGifsMenuVisibility } from '../../functions';

import GifsMenu from './GifsMenu';

type Props = {

    /**
    * Component's children (the gifs menu button).
    */
    children: React$Node,

    /**
     * The click event handler.
     */
    handleClick: Function
}

const useStyles = makeStyles(() => {
    return {
        popup: {
            display: 'inline-block',
            position: 'relative'
        },

        drawerButton: {
            display: 'block'
        }
    };
});

/**
 * Popup with reactions menu.
 *
 * @returns {ReactElement}
 */
function GifsMenuPopup({
    handleClick,
    children
}: Props) {

    /**
    * Flag controlling the visibility of the popup.
    */
    const isOpen = useSelector(state => getGifsMenuVisibility(state));
    const styles = useStyles();
    const overflowDrawer = useSelector(showOverflowDrawer);

    return (
        <Popover
            className = { clsx(styles.popup, overflowDrawer && styles.drawerButton) }
            clickOnlyDisplay = { true }
            content = { <GifsMenu handleClick = { handleClick } /> }
            disableKeypressClose = { true }
            id = 'gifs-menu-trigger'
            onPopoverClose = { handleClick }
            onPopoverOpen = { handleClick }
            position = 'top'
            visible = { isOpen }>
            {children}
        </Popover>
    );
}

export default GifsMenuPopup;