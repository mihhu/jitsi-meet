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
 * @param {Object} state - Redux state.
 * @returns {Array}
 */
export function getWhiteboardStrokes(state) {
    return state['features/whiteboard'].strokes;
}

/**
 * Returns the initial whiteboard dimensions.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
export function getInitialWhiteboardDimensions(state) {
    return state['features/whiteboard'].dimensions;
}

/**
 * Returns the stroke color.
 *
 * @param {Object} state - Redux state.
 * @returns {string}
 */
export function getStrokeColor(state) {
    return state['features/whiteboard'].color;
}
