/* eslint-disable arrow-body-style */
/* eslint-disable valid-jsdoc */ // TODO: fix
import {
    DISABLE_WHITEBOARD,
    ENABLE_WHITEBOARD,
    SET_USERNAME_STATUS,
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
 * @param {Object} payload - The whiteboard settings.
 * @returns {{
 *     type: ENABLE_WHITEBOARD,
 *     id: string,
 *     participantId: string,
 *     collabLink: { roomId: string; roomKey: string }
 * }}
 */
export const enableWhiteboard = ({ id, participantId, collabLink }: {
    id: string, participantId: string, collabLink: { roomId: string; roomKey: string }
}): any => ({
    type: ENABLE_WHITEBOARD,
    id,
    participantId,
    collabLink
});

/**
 * Toggles the whiteboard.
 *
 * @param {Object} payload - The whiteboard settings.
 * @returns {{
 *     type: TOGGLE_WHITEBOARD,
 *     id,
 *     participantId
 * }}
 */
export const toggleWhiteboard = ({ id, participantId }: { id: string, participantId: string }): any => ({
    type: TOGGLE_WHITEBOARD,
    id,
    participantId
});

/**
 * Updates the username status.
 *
 * @param {string} usernameStatus - Whether the username has just been updated.
 *
 * @returns {{
 *     type: SET_USERNAME_STATUS,
 *     usernameStatus: string
 * }}
 */
export const setUsernameStatus = (usernameStatus: string): any => ({
    type: SET_USERNAME_STATUS,
    usernameStatus
});
