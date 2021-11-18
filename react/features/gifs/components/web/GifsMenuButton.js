// @flow

import { makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isMobileBrowser } from '../../../base/environment/utils';
import { translate } from '../../../base/i18n';
import { IconGifs } from '../../../base/icons';
import { connect } from '../../../base/redux';
import ToolbarButton from '../../../toolbox/components/web/ToolbarButton';
import { toggleGifsMenuVisibility } from '../../actions';
import { getGifsMenuVisibility } from '../../functions';

import GifsMenuPopup from './GifsMenuPopup';


type Props = {

    /**
     * Redux dispatch function.
     */
    dispatch: Function,

    /**
     * Click handler for raise hand functionality.
     */
    handleClick: Function,

    /**
     * Whether or not it's a mobile browser.
     */
    isMobile: boolean,

    /**
     * Used for translation.
     */
    t: Function
};


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
 * @returns {ReactElement}
 */
function GifsMenuButton({
    t
}: Props) {

    const styles = useStyles();
    const isOpen = useSelector(state => getGifsMenuVisibility(state));
    const dispatch = useDispatch();

    const handleClick = useCallback(e => {
        e && e.stopPropagation();
        dispatch(toggleGifsMenuVisibility());
    }, [ dispatch ]);

    const gifButton = (<ToolbarButton
        accessibilityLabel = { t('toolbar.accessibilityLabel.gifs') }
        icon = { IconGifs }
        key = 'gifs'
        onClick = { handleClick }
        toggled = { isOpen }
        tooltip = { t('toolbar.gifs') } />
    );

    return (
        <div className = { styles.container }>
            <GifsMenuPopup handleClick = { handleClick }>
                {gifButton}
            </GifsMenuPopup>
        </div>
    );
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @returns {Object}
 */
function mapStateToProps() {
    return {
        isMobile: isMobileBrowser()
    };
}

export default translate(connect(mapStateToProps)(GifsMenuButton));
