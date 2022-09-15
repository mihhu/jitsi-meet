/* eslint-disable import/order */
import md5 from 'js-md5';

// @ts-ignore
import { getPinnedParticipant } from '../../features/base/participants';
import { appendURLParam } from '../base/util/uri';

// @ts-ignore
import { getCurrentRoomId, isInBreakoutRoom } from '../breakout-rooms/functions';

const getWhiteboardState = (state: any): any => state['features/whiteboard'];

/**
 * Indicates whether the whiteboard is open.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {boolean}
 */
export const isWhiteboardOpen = (state: any): boolean => getWhiteboardState(state).enabled;

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
export const getCollabLink = (state: any): {
    roomId: string, roomKey: string
} => getWhiteboardState(state).collabLink || {};

export const getCollabServerUrl = (state: any): string => {
    const collabServerBaseUrl = state['features/base/config'].whiteboard?.collabServerBaseUrl
    || 'https://excalidraw-backend-pilot.jitsi.net'; // TODO: remove default

    const inBreakoutRoom = isInBreakoutRoom(state);
    const roomId = getCurrentRoomId(state);
    const room = md5.hex(`${window.location.href}${inBreakoutRoom ? `|${roomId}` : ''}`);

    return appendURLParam(collabServerBaseUrl, 'room', room); // TODO: native with getInviteURL
};

// TODO: remove negation
export const isWhiteboardEnabled = (state: any): boolean => !state['features/base/config'].whiteboard?.enabled;

/**
 * Whether the whiteboard should be visible.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {boolean}
 */
export const isWhiteboardVisible = (state: any): boolean =>
    isWhiteboardEnabled(state)
    && isWhiteboardOpen(state)
    && getPinnedParticipant(state)?.id === getWhiteboardId(state);

/**
 * Returns the username update status.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {string} - The username status.
 */
export const getUsernameStatus = (state: any): string => getWhiteboardState(state).usernameStatus;
