// @flow
import { MiddlewareRegistry } from '../base/redux';
import { setTileView } from '../video-layout';

import { START_WHITEBOARD } from './actionTypes';

// import './subscriber';

/**
 * Middleware which intercepts actions and updates tile view related state.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case START_WHITEBOARD: {
        store.dispatch(setTileView(false));
        break;
    }
    }

    return next(action);
});

