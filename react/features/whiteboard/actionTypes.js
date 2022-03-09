/**
 * The type of the action which starts the whiteboard mode (moderators only).
 *
 * {
 *     type: START_WHITEBOARD
 * }
 */
export const START_WHITEBOARD = 'START_WHITEBOARD';

/**
 * The type of the action which ends the whiteboard mode (moderators only).
 *
 * {
 *     type: END_WHITEBOARD
 * }
 */
export const END_WHITEBOARD = 'END_WHITEBOARD';

/**
 * The type of the action which toggles the whiteboard mode.
 *
 * {
 *     type: TOGGLE_WHITEBOARD,
 *     on: boolean
 * }
 */
export const TOGGLE_WHITEBOARD = 'TOGGLE_WHITEBOARD';

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
 *          width,
 *          height
 *     },
 * }
 */
export const ADD_STROKE = 'ADD_STROKE';
