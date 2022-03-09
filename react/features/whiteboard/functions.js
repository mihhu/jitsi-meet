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

/**
 * Returns the whiteboard strokes.
 *
 * @param {Object} state
 * @returns {Array}
 */
export function getWhiteboardStrokes(state) {
    return state['features/whiteboard'].strokes;
}
