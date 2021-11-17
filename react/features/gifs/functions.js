
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
