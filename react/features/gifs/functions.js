/**
 * Gets the URL of the GIF for the given participant or null if there's none.
 *
 * @param {Object} state - Redux state.
 * @param {string} participantId - Id of the participant for which to remove the GIF.
 * @returns {Object}
 */
export function getGifForParticipant(state, participantId) {
    return state['features/gifs'].gifList.get(participantId) || {};
}

/**
 * Whether or not the message is a GIF message.
 *
 * @param {string} message - Message to check.
 * @returns {boolean}
 */
export function isGifMessage(message) {
    return message.trim().startsWith('gif[');
}

/**
 * Returns the visibility state of the gifs menu.
 *
 * @param {Object} state - The state of the application.
 * @returns {boolean}
 */
export function getGifsMenuVisibility(state) {
    return state['features/gifs'].visible;
}

/**
 * Returns the url of the gif selected in the gifs menu.
 *
 * @param {Object} gif - The gif data.
 * @returns {boolean}
 */
export function getGifUrl(gif) {
    // TODO: switch for the gif api

    const idx = gif?.embed_url.lastIndexOf('/');
    const id = gif?.embed_url.substr(idx + 1);

    /* eslint-disable camelcase */
    return `https://i.giphy.com/media/${id}/giphy.webp`;
}

/**
 * Formats the gif message.
 *
 * @param {string} url - GIF url.
 * @returns {string}
 */
export function formatGifUrlMessage(url) {
    return `gif[${url}]`;
}
