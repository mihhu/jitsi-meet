// @flow

import {
    ADD_STROKE,
    END_WHITEBOARD,
    START_WHITEBOARD,
    TOGGLE_WHITEBOARD
} from './actionTypes';

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

/**
 * Changes the whiteboard on state.
 *
 * @param {boolean} on - Whether it should be on or not.
 * @returns {Object}
 */
export function toggleWhiteboard(on) {
    return {
        type: TOGGLE_WHITEBOARD,
        on
    };
}

/**
 * Adds a stroke on the whiteboard.
 *
 * @param {boolean} on - Whether it should be on or not.
 * @returns {Object}
 */
 export function addStroke(stroke) {
    return {
        type: ADD_STROKE,
        stroke
    };
}