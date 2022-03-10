/**
 * The payload name for the datachannel/endpoint whiteboard stroke event.
 */
export const ENDPOINT_WHITEBOARD_STROKE_NAME = 'endpoint-whiteboard-stroke';

/**
 * The {ClearWhiteboard} command.
 */
export const CLEAR_WHITEBOARD_COMMAND = 'clear-whiteboard';

/**
 * The (name of the) command which transports the state (represented by
 * {State} for the local state at the time of this writing) of a {ToggleWhiteboard}
 * (instance) between moderator and participants.
 */
export const TOGGLE_WHITEBOARD_COMMAND = 'toggle-whiteboard';

/**
 * The aspect ratio of the whiteboard.
 */
export const WHITEBOARD_ASPECT_RATIO = 16 / 9;
