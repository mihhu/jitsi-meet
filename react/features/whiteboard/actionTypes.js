/**
 * The type of the action which adds a stroke on the whiteboard.
 *
 * {
 *     type: ADD_STROKE,
 *     stroke: {
 *          content,
 *          points,
 *          type
 *     },
 *     dimensions: {
 *          height
 *          left,
 *          top,
 *          width,
 *     },
 * }
 */
export const ADD_STROKE = 'ADD_STROKE';

/**
 * The type of the action which clears the whiteboard.
 *
 * {
 *     type: CLEAR_WHITEBOARD
 * }
 */
export const CLEAR_WHITEBOARD = 'CLEAR_WHITEBOARD';

/**
 * The type of the action which changes the stroke color.
 *
 * {
 *     type: CHANGE_COLOR
 * }
 */
export const CHANGE_COLOR = 'CHANGE_COLOR';

/**
 * The type of the action which ends the whiteboard mode (moderators only).
 *
 * {
 *     type: END_WHITEBOARD
 * }
 */
export const END_WHITEBOARD = 'END_WHITEBOARD';

/**
 * The type of the action which starts the whiteboard mode (moderators only).
 *
 * {
 *     type: START_WHITEBOARD
 * }
 */
export const START_WHITEBOARD = 'START_WHITEBOARD';

/**
 * The type of the action which toggles the whiteboard mode.
 *
 * {
 *     type: TOGGLE_WHITEBOARD,
 *     on: boolean
 * }
 */
export const TOGGLE_WHITEBOARD = 'TOGGLE_WHITEBOARD';
