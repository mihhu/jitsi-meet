/**
 * Disable the whiteboard functionality.
 * {{
 *      type: DISABLE_WHITEBOARD
 * }}
 */
export const DISABLE_WHITEBOARD: string = 'DISABLE_WHITEBOARD';

/**
 * Enable the whiteboard functionality.
 * {{
 *      type: ENABLE_WHITEBOARD,
 *      id,
 *      participantId,
 *      collabLink
 * }}
 */
export const ENABLE_WHITEBOARD: string = 'ENABLE_WHITEBOARD';

/**
 * Toggle the whiteboard functionality.
 * {{
 *      type: TOGGLE_WHITEBOARD,
 *      id,
 *      participantId
 * }}
 */
export const TOGGLE_WHITEBOARD: string = 'TOGGLE_WHITEBOARD';

/**
 * Updates the username status.
 * {{
 *      type: SET_USERNAME_STATUS,
 *      elements
 * }}
 */
export const SET_USERNAME_STATUS: string = 'SET_USERNAME_STATUS';
