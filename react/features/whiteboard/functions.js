// @flow

/**
 * Whether or not the whiteboard is on.
 *
 * @param {Object} state - Redux state.
 * @returns {boolean}
 */
export function isWhiteboardOn(state) {
    return state['features/whiteboard'].on;
}
