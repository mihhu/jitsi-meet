// @ts-ignore
import { getPinnedParticipant } from '../../features/base/participants';

/**
 * Indicates whether the whiteboard is enabled.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {boolean}
 */
export const isWhiteboardEnabled = (state: any): boolean => state['features/whiteboard'].enabled;

/**
 * Returns the whiteboard id.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {string|null}
 */
export const getWhiteboardId = (state: any): string|null => state['features/whiteboard'].id;

/**
 * Whether the whiteboard should be visible.
 *
 * @param {Object} state - The state from the Redux store.
 * @returns {boolean}
 */
export const shouldDisplayWhiteboard = (state: any): boolean =>
    isWhiteboardEnabled(state) && getPinnedParticipant(state)?.id === getWhiteboardId(state);
