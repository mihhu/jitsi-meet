/* eslint-disable arrow-body-style */

import {
    DISABLE_WHITEBOARD,
    ENABLE_WHITEBOARD,
    TOGGLE_WHITEBOARD
} from './actionTypes';

/**
 * Disables the whiteboard.
 *
 * @returns {{
 *     type: DISABLE_WHITEBOARD
 * }}
 */
export const disableWhiteboard = (): any => ({ type: DISABLE_WHITEBOARD });

/**
 * Enables the whiteboard.
 *
 * @returns {{
 *     type: ENABLE_WHITEBOARD,
 *     payload: { id: string }
 * }}
 */
export const enableWhiteboard = ({ id }: { id: string }): any => ({
    type: ENABLE_WHITEBOARD,
    id
});

/**
 * Toggles the whiteboard.
 *
 * @returns {{
 *     type: TOGGLE_WHITEBOARD,
 *     payload: { id: string }
 * }}
 */
export const toggleWhiteboard = ({ id }: { id: string }): any => ({
    type: TOGGLE_WHITEBOARD,
    id
});
