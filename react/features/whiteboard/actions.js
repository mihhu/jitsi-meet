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
 * @param {Object} stroke - The stroke to be added.
 * @param {Object} dimensions - The current dimensions of the canvas.
 * @param {boolean} received - Whether the stroke was received from another participant.
 * @returns {Object}
 */
export function addStroke(stroke, dimensions, received = false) {
    return {
        type: ADD_STROKE,
        stroke,
        dimensions,
        received
    };
}
