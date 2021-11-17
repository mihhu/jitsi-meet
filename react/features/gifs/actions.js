import {
    ADD_GIF_FOR_PARTICIPANT,
    HIDE_GIF_FOR_PARTICIPANT,
    REMOVE_GIF_FOR_PARTICIPANT,
    SHOW_GIF_FOR_PARTICIPANT,
    TOGGLE_GIFS_VISIBLE
} from './actionTypes';

/**
 * Adds a GIF for a given participant.
 *
 * @param {string} participantId - The id of the participant that sent the GIF.
 * @param {string} gifUrl - The URL of the GIF.
 * @returns {Object}
 */
export function addGif(participantId, gifUrl) {
    return {
        type: ADD_GIF_FOR_PARTICIPANT,
        participantId,
        gifUrl
    };
}

/**
 * Removes the GIF of the given participant.
 *
 * @param {string} participantId - The Id of the participant for whom to remove the GIF.
 * @returns {Object}
 */
export function removeGif(participantId) {
    return {
        type: REMOVE_GIF_FOR_PARTICIPANT,
        participantId
    };
}

/**
 * Keep showing the GIF of the given participant.
 *
 * @param {string} participantId - The Id of the participant for whom to show the GIF.
 * @returns {Object}
 */
export function showGif(participantId) {
    return {
        type: SHOW_GIF_FOR_PARTICIPANT,
        participantId
    };
}

/**
 * Set timeout to hide the GIF of the given participant.
 *
 * @param {string} participantId - The Id of the participant for whom to show the GIF.
 * @returns {Object}
 */
export function hideGif(participantId) {
    return {
        type: HIDE_GIF_FOR_PARTICIPANT,
        participantId
    };
}

/**
 * Toggles the visibility of the gifs menu.
 *
 * @returns {Object}
 */
export function toggleGifsMenuVisibility() {
    return {
        type: TOGGLE_GIFS_VISIBLE
    };
}
