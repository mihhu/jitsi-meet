// @flow

import { END_WHITEBOARD, START_WHITEBOARD } from './actionTypes';

/**
 * Starts the whiteboard mode.
 *
 * @returns {Object}
 */
export function startWhiteboard() {
    return {
        type: START_WHITEBOARD
    };
}

/**
 * Ends the whiteboard mode.
 *
 * @returns {Object}
 */
export function endWhiteboard() {
    return {
        type: END_WHITEBOARD
    };
}
