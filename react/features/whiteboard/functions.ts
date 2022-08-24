// @ts-ignore
import { getPinnedParticipant } from '../../features/base/participants';

const getWhiteboardState = (state: any): any => state['features/whiteboard'];

/**
 * Indicates whether the whiteboard is enabled.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {boolean}
 */
export const isWhiteboardEnabled = (state: any): boolean => getWhiteboardState(state).enabled;

/**
 * Returns the whiteboard id.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {string|null}
 */
export const getWhiteboardId = (state: any): string|null => getWhiteboardState(state).id;

/**
 * Returns the id of the participant that enabled the whiteboard.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {string|null}
 */
export const getWhiteboardParticipantId = (state: any): string|null => getWhiteboardState(state).participantId;

/**
 * Returns the whiteboard collaboration link.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {{ roomId: string, roomKey: string}|null}
 */
export const getCollabLink = (state: any): any => getWhiteboardState(state).collabLink;

/**
 * Whether the whiteboard should be visible.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {boolean}
 */
export const shouldDisplayWhiteboard = (state: any): boolean =>
    isWhiteboardEnabled(state)
    && getPinnedParticipant(state)?.id === getWhiteboardId(state);

/**
 * Returns the username update status.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {string} - The username status.
 */
export const getUsernameStatus = (state: any): string => getWhiteboardState(state).usernameStatus;
