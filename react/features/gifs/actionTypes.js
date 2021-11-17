/**
 * Adds a gif for a given participant.
 * {{
 *      type: ADD_GIF_FOR_PARTICIPANT,
 *      participantId: string,
 *      gifUrl: string,
 *      timeoutID: number
 * }}
 */
export const ADD_GIF_FOR_PARTICIPANT = 'ADD_GIF_FOR_PARTICIPANT';

/**
 * Removes a gif for a given participant.
 * {{
 *      type: REMOVE_GIF_FOR_PARTICIPANT,
 *      participantId: string
 * }}
 */
export const REMOVE_GIF_FOR_PARTICIPANT = 'REMOVE_GIF_FOR_PARTICIPANT';

/**
 * Keep showing a gif for a given participant.
 * {{
 *      type: SHOW_GIF_FOR_PARTICIPANT,
 *      participantId: string
 * }}
 */
export const SHOW_GIF_FOR_PARTICIPANT = 'SHOW_GIF_FOR_PARTICIPANT';

/**
 * set timeout to hide a gif for a given participant.
 * {{
 *      type: HIDE_GIF_FOR_PARTICIPANT,
 *      participantId: string
 * }}
 */
export const HIDE_GIF_FOR_PARTICIPANT = 'HIDE_GIF_FOR_PARTICIPANT';

/**
 * The type of the (redux) action which shows/hides the gifs menu.
 *
 * {{
 *     type: TOGGLE_GIFS_VISIBLE,
 *     visible: boolean
 * }}
 */
export const TOGGLE_GIFS_VISIBLE = 'TOGGLE_GIFS_VISIBLE';
