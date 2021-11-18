// @flow

/* eslint-disable react/jsx-no-bind */
import Spinner from '@atlaskit/spinner';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '../../../base/i18n';
import { showOverflowDrawer } from '../../../toolbox/functions.web';
import { getGifUrl } from '../../functions';

/**
 * Returns the array of Gifs to be rendered based on search.
 *
 * @param {Function} fetchGifs - The function used to retrieve gifs.
 * @param {Array} initialGifs - The array of already loaded gifs.
 * @param {string} searchKey - The term used for search.
 * @param {string} prevSearchKey - The previous term used for search.
 *
 * @returns {Array} The array of Gifs to be rendered.
 */
function gifPaginator(fetchGifs, initialGifs, searchKey, prevSearchKey) {
    const gifs = searchKey === prevSearchKey ? [ ...initialGifs ] : [];
    const gifIds = new Set(initialGifs.map(g => g.id));
    let isDoneFetching = false;
    let offset = initialGifs.length;

    return async () => {
        if (isDoneFetching) {
            return gifs;
        }
        const result = await fetchGifs(offset, searchKey);
        const { pagination, data: newGifs } = result;

        offset = pagination.count + pagination.offset;
        isDoneFetching = offset === pagination.total_count;
        newGifs.forEach(gif => {
            const { id } = gif;

            if (!gifIds.has(id)) {
                gifs.push(gif);
                gifIds.add(id);
            }
        });

        return [ ...gifs ];
    };
}

type Props = {

    /**
     * The function that returns a Promise.
     */
    fetchGifs: Function,

    /**
     * The height a Gif must fill.
     */
    gifHeight: Number,

    /**
     * The click event handler.
     */
    onGifClick: Function,

    /**
     * The searched key for Gifs.
     */
    searchKey: String,

    /**
     * Used for translation.
     */
    t: Function
};

const gifHeight = 200;

const useStyles = makeStyles(theme => {
    return {
        carousel: {
            overflowX: 'auto',
            height: `${gifHeight}px`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },

        img: {
            height: '100%',
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

        spinnerContainer: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        },

        carouselDrawer: {
            height: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },

        imgDrawer: {
            maxHeight: `${gifHeight}px`
        },

        notFound: {
            color: theme.palette.field01Disabled,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        }
    };
});

/**
 * Popup with gifs menu.
 *
 * @returns {ReactElement}
 */
function GifsCarousel({
    fetchGifs,
    onGifClick,
    searchKey,
    t
}: Props) {
    const [ gifs, setGifs ] = useState([]);
    const [ loading, isLoading ] = useState(true);
    const [ fetching, isFetching ] = useState(false);
    const styles = useStyles();
    const paginator = useRef();
    const unmounted = useRef(false);
    const [ prevSearchKey, setPrevSearchKey ] = useState();
    const overflowDrawer = useSelector(showOverflowDrawer);

    const onFetch = useCallback(async () => {
        if (unmounted.current) {
            return;
        }

        if (!fetching) {
            isFetching(true);
            isLoading(true);
            let fetchedGifs = [];

            try {
                if (paginator.current) {
                    fetchedGifs = await paginator.current();
                } else {
                    throw new Error('Missing paginator');
                }
            } catch (error) {
                isFetching(false);
            }
            if (fetchedGifs && !fetching) {
                isLoading(false);
                isFetching(false);
                setGifs(fetchedGifs);
            }
        }
    }, []);

    useEffect(() => {
        paginator.current = gifPaginator(fetchGifs, gifs, searchKey);
        setPrevSearchKey(searchKey);
        onFetch();

        return () => {
            unmounted.current = true;
        };
    }, []);

    useEffect(() => {
        paginator.current = gifPaginator(fetchGifs, gifs, searchKey, prevSearchKey);
        onFetch();
    }, [ fetchGifs, searchKey ]);

    const handleKeyDown = useCallback((gif, e) => {
        if (e.key !== 'Enter') {
            return;
        }
        onGifClick(gif, e);
    });

    const renderGifsSequence = useCallback(() => !loading && gifs.map((gif, index) => {
        const gifSrc = getGifUrl(gif);

        return (
            <img
                alt = 'GIF'
                className = { clsx(styles.img, overflowDrawer && styles.imgDrawer) }
                key = { `gifResult-${index}-${gifSrc}` }
                onClick = { e => onGifClick(gif, e) }
                onKeyDown = { e => handleKeyDown(gif, e) }
                src = { gifSrc }
                tabIndex = '0' />
        );
    }), [ loading, gifs, onGifClick, handleKeyDown ]);

    const renderLoadingSpinner = useCallback(() => loading && (
        <div className = { styles.spinnerContainer }>
            <Spinner size = { 'large' } />
        </div>
    ), [ loading ]);

    const renderNoResults = useCallback(() => (!loading && gifs.length === 0) && (
        <div className = { styles.notFound }>
            {t('gifs.noResults')}
        </div>
    ), [ loading, gifs, t ]);

    return (
        <div
            className = { clsx(styles.carousel,
                overflowDrawer && styles.carouselDrawer
            ) }>
            { renderGifsSequence() }
            { renderLoadingSpinner() }
            { renderNoResults() }
        </div>
    );
}

export default translate(GifsCarousel);
