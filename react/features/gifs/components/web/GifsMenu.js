// @flow

/* eslint-disable react/jsx-no-bind */
import { GiphyFetch } from '@giphy/js-fetch-api';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isMobileBrowser } from '../../../base/environment/utils';
import { translate } from '../../../base/i18n';
import { getLocalParticipant } from '../../../base/participants';
import InputField from '../../../base/premeeting/components/web/InputField';
import { connect } from '../../../base/redux';
import { sendMessage } from '../../../chat/actions.any';
import { dockToolbox } from '../../../toolbox/actions.web';
import { showOverflowDrawer } from '../../../toolbox/functions.web';
import { formatGifUrlMessage, getGifUrl } from '../../functions';

import GifsCarousel from './GifsCarousel';

const TO_EXPORT_API_KEY = 'A4C69dn3EPwkbAZnAujzA9B29ocUKJeC';

type Props = {

    /**
     * Docks the toolbox.
     */
    _dockToolbox: Function,

    /**
     * Whether or not it's a mobile browser.
     */
    _isMobile: boolean,

    /**
     * The ID of the local participant.
     */
    _localParticipantID: String,

    /**
     * The Redux Dispatch function.
     */
    dispatch: Function,

    /**
     * The click event handler.
     */
    handleClick: Function,

    /**
     * Used for translation.
     */
    t: Function
};

const useStyles = makeStyles(theme => {
    return {
        gifsMenu: {
            width: '400px'
        },
        searchField: {
            backgroundColor: theme.palette.field01,
            borderRadius: `${theme.shape.borderRadius}px`,
            border: 'none',
            outline: 0,
            ...theme.typography.bodyShortRegular,
            lineHeight: `${theme.typography.bodyShortRegular.lineHeight}px`,
            color: theme.palette.text01,
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            textAlign: 'center',
            width: '100%',
            marginBottom: `${theme.spacing(3)}px`
        },

        overflowMenu: {
            padding: `${theme.spacing(3)}px`,
            width: '100%',
            height: '100%',
            boxSizing: 'border-box'
        }
    };
});

/**
 * Popup with gifs menu.
 *
 * @returns {ReactElement}
 */
function GifsMenu({
    _dockToolbox,
    handleClick,
    t
}: Props) {
    const giphyFetch = new GiphyFetch(TO_EXPORT_API_KEY);
    const [ searchKey, setSearchKey ] = useState();
    const styles = useStyles();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const overflowDrawer = useSelector(showOverflowDrawer);

    const fetchGifs = async (offset, key) => {
        const options = {
            rating: 'pg-13',
            limit: 20,
            offset
        };

        if (!key) {
            return await giphyFetch.trending(options);
        }

        return await giphyFetch.search(key, options);
    };

    useEffect(() => {
        _dockToolbox(true);
        const initGifs = async () => {
            await fetchGifs();
            inputRef.current.focus();
        };

        initGifs();

        return () => {
            _dockToolbox(false);
        };
    }, []);

    const handleGifClick = useCallback((gif, e) => {
        e.preventDefault();
        e.stopPropagation();
        const url = getGifUrl(gif);

        dispatch(sendMessage(formatGifUrlMessage(url), true));
        handleClick(e);
    }, [ dispatch ]);

    const handleSearchKeyChange = useCallback(value => {
        setSearchKey(value);
    });


    return (
        <div
            className = { clsx(styles.gifsMenu,
                overflowDrawer && styles.overflowMenu
            ) }>
            <InputField
                autoFocus = { true }
                className = { styles.searchField }
                onChange = { handleSearchKeyChange }
                placeHolder = { t('gifs.search') }
                ref = { inputRef }
                testId = 'gifSearch.key' />
            <GifsCarousel
                fetchGifs = { fetchGifs }
                onGifClick = { handleGifClick }
                searchKey = { searchKey } />
        </div>
    );
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
function mapStateToProps(state) {
    const localParticipant = getLocalParticipant(state);

    return {
        _localParticipantID: localParticipant.id,
        _isMobile: isMobileBrowser()
    };
}

/**
 * Function that maps parts of Redux actions into component props.
 *
 * @param {Object} dispatch - Redux dispatch.
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(
        {
            _dockToolbox: dockToolbox
        }, dispatch)
    };
}

export default translate(connect(
    mapStateToProps,
    mapDispatchToProps
)(GifsMenu));
