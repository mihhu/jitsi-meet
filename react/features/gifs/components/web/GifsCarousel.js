// @flow

/* eslint-disable react/jsx-no-bind */
import { makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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
    searchKey: String
};

const useStyles = makeStyles(() => {
    return {
        carousel: {
            overflow: 'auto'
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
    gifHeight,
    onGifClick,
    searchKey
}: Props) {
    const [ gifs, setGifs ] = useState([]);
    const [ fetching, isFetching ] = useState(false);
    const styles = useStyles();
    const paginator = useRef();
    const unmounted = useRef(false);
    const [ prevSearchKey, setPrevSearchKey ] = useState();

    const onFetch = useCallback(async () => {
        if (unmounted.current) {
            return;
        }

        if (!fetching) {
            isFetching(true);
            let fetchedGifs = [];

            try {
                fetchedGifs = await paginator.current();
            } catch (error) {
                isFetching(false);
            }
            if (fetchedGifs) {
                if (gifs.length !== fetchedGifs.length) {
                    setGifs(fetchedGifs);
                    isFetching(false);

                    // onFetch();
                }
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

    return (
        <div
            className = { styles.carousel }
            style = {{ height: gifHeight + 10 }}>
            {
                gifs.map((gif, index) => {
                    const gifSrc = getGifUrl(gif);

                    return (
                        <img
                            alt = 'GIF'
                            key = { `gifResult-${index}-${gifSrc}` }
                            onClick = { e => onGifClick(gif, e) }
                            onKeyDown = { e => handleKeyDown(gif, e) }
                            src = { gifSrc }
                            style = {{ height: gifHeight }}
                            tabIndex = '0' />
                    );
                })
            }
        </div>
    );
}

export default GifsCarousel;
