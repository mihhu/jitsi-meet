// @flow

/* eslint-disable react/jsx-no-bind */
import { GiphyFetch } from '@giphy/js-fetch-api';
import { makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isMobileBrowser } from '../../../base/environment/utils';
import { translate } from '../../../base/i18n';
import { getLocalParticipant } from '../../../base/participants';
import InputField from '../../../base/premeeting/components/web/InputField';
import { connect } from '../../../base/redux';
import { sendMessage } from '../../../chat/actions.any';
import { dockToolbox } from '../../../toolbox/actions.web';
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

const useStyles = makeStyles(() => {
    return {
        gifsMenu: {
            width: '400px'
        },
        searchField: {
            backgroundColor: 'white',
            border: 'none',
            outline: 0,
            borderRadius: '6px',
            fontSize: '14px',
            lineHeight: '20px',
            color: '#1c2025',
            padding: '10px 16px',
            textAlign: 'center',
            width: '100%'
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

    const fetchGifs = async (offset, key) => {
        const options = {
            rating: 'pg-13',
            limit: 10,
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
        <div className = { styles.gifsMenu }>
            <InputField
                autoFocus = { true }
                className = { styles.searchField }
                onChange = { handleSearchKeyChange }
                placeHolder = { t('gifs.search') }
                ref = { inputRef }
                testId = 'gifSearch.key' />
            <GifsCarousel
                fetchGifs = { fetchGifs }
                gifHeight = { 200 }
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
