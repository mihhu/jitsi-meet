// @flow

import {
    ADD_STROKE,
    CHANGE_COLOR,
    CLEAR_WHITEBOARD,
    END_WHITEBOARD,
    SAVE_INITIAL_DIMENSIONS,
    SET_WHITEBOARD_DATA_URL,
    START_WHITEBOARD,
    SYNC_ALL_WHITEBOARDS,
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
 * Clears the whiteboard.
 *
 * @param {boolean} received - Whether the stroke was received from another participant.
 * @returns {Object}
 */
export function clearWhiteboard(received = false) {
    return {
        type: CLEAR_WHITEBOARD,
        received
    };
}

/**
 * Saves initial whiteboard dimensions.
 *
 * @param {Object} dimensions - The initial dimensions.
 * @returns {Object}
 */
export function saveInitialDimensions(dimensions) {
    return {
        type: SAVE_INITIAL_DIMENSIONS,
        dimensions
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

/**
 * Changes the stroke color.
 *
 * @param {string} color - The new color.
 * @returns {Object}
 */
export function changeColor(color) {
    return {
        type: CHANGE_COLOR,
        color
    };
}

/**
 * Syncs all whiteboards with local one.
 *
 * @returns {Object}
 */
export function syncAllWhiteboards() {
    return {
        type: SYNC_ALL_WHITEBOARDS
    };
}

/**
 * Sets the data url. ! Fix comment.
 *
 * @param {string} dataUrl - Canvas as data url.
 * @returns {Object}
 */
export function setWhiteboardDataUrl(dataUrl) {
    return {
        type: SET_WHITEBOARD_DATA_URL,
        dataUrl
    };
}
