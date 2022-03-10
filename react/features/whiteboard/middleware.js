// @flow
import rough from 'roughjs/bundled/rough.esm';

import { CONFERENCE_WILL_JOIN, getCurrentConference } from '../base/conference';
import {
    getLocalParticipant,
    getParticipantById,
    getParticipantCount,
    isLocalParticipantModerator
} from '../base/participants';
import { MiddlewareRegistry } from '../base/redux';
import { setTileView, SET_TILE_VIEW } from '../video-layout';

import {
    ADD_STROKE,
    CLEAR_WHITEBOARD,
    END_WHITEBOARD,
    START_WHITEBOARD,
    SYNC_ALL_WHITEBOARDS,
    TOGGLE_WHITEBOARD
} from './actionTypes';
import { clearWhiteboard, setWhiteboardDataUrl, toggleWhiteboard } from './actions';
import {
    CLEAR_WHITEBOARD_COMMAND,
    ENDPOINT_WHITEBOARD_STROKE_NAME,
    ENDPOINT_WHITEBOARD_SYNC_NAME,
    TOGGLE_WHITEBOARD_COMMAND
} from './constants';
import { getInitialWhiteboardDimensions, getWhiteboardStrokes, isWhiteboardOn } from './functions';
import logger from './logger';

// import './subscriber';

/**
 * Middleware which intercepts actions and updates tile view related state.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case CONFERENCE_WILL_JOIN: {
        const { conference } = action;

        conference.addCommandListener(
            TOGGLE_WHITEBOARD_COMMAND, ({ attributes }, id) => {
                _onToggleWhiteboardCommand(attributes, id, store);
            });
        conference.addCommandListener(
            CLEAR_WHITEBOARD_COMMAND, (_, id) => {
                _onClearWhiteboardCommand(id, store);
            }
        );
        break;
    }
    case START_WHITEBOARD: {
        const state = store.getState();
        const conference = getCurrentConference(state);

        if (isWhiteboardOn(state) || !isLocalParticipantModerator(state)) {
            return;
        }

        store.dispatch(setTileView(false));
        if (conference) {
            conference.sendCommand(TOGGLE_WHITEBOARD_COMMAND, { attributes: { on: true } });
        }
        break;
    }
    case END_WHITEBOARD: {
        const state = store.getState();
        const conference = getCurrentConference(state);

        if (!isWhiteboardOn(state) || !isLocalParticipantModerator(state)) {
            return;
        }

        if (conference) {
            conference.sendCommand(TOGGLE_WHITEBOARD_COMMAND, { attributes: { on: false } });
        }
        break;
    }
    case TOGGLE_WHITEBOARD: {
        if (action.on) {
            store.dispatch(setTileView(false));
        }
        break;
    }
    case ADD_STROKE: {
        const state = store.getState();
        const conference = getCurrentConference(state);
        const initialDimensions = getInitialWhiteboardDimensions(state);
        const participantCount = getParticipantCount(state);

        if (conference && !action.received && participantCount > 1) {
            conference.sendEndpointMessage('', {
                name: ENDPOINT_WHITEBOARD_STROKE_NAME,
                stroke: action.stroke,
                dimensions: initialDimensions,
                participantId: getLocalParticipant(state).id,
                timestamp: Date.now()
            });
        }
        if (action.received) {
            const xScale = initialDimensions.width / action.dimensions.width;
            const yScale = initialDimensions.height / action.dimensions.height;

            action.stroke.points = action.stroke.points.map(([ x, y ]) => [
                x * xScale,
                y * yScale
            ]);

        }
        break;
    }
    case CLEAR_WHITEBOARD: {
        const state = store.getState();
        const conference = getCurrentConference(state);

        if (isWhiteboardOn(state) && isLocalParticipantModerator(state) && !action.received) {
            conference.sendCommand(CLEAR_WHITEBOARD_COMMAND, {});
        }
        break;
    }
    case SYNC_ALL_WHITEBOARDS: {
        const state = store.getState();
        const conference = getCurrentConference(state);
        const participantCount = getParticipantCount(state);
        const initialDimensions = getInitialWhiteboardDimensions(state);

        if (conference && !action.received && participantCount > 1) {
            conference.sendEndpointMessage('', {
                name: ENDPOINT_WHITEBOARD_SYNC_NAME,
                strokes: getWhiteboardStrokes(state),
                dimensions: initialDimensions
            });
        }
        break;
    }
    case SET_TILE_VIEW: {
        const state = store.getState();

        if (isWhiteboardOn(state)) {
            const strokes = getWhiteboardStrokes(state);
            const initialDimensions = getInitialWhiteboardDimensions(state);
            const canvas = document.createElement('canvas');

            canvas.width = initialDimensions.width;
            canvas.height = initialDimensions.height;
            const generator = rough.generator();
            const roughCanvas = rough.canvas(canvas);

            strokes.forEach(s => roughCanvas.draw(generator.linearPath(s.points)));
            store.dispatch(setWhiteboardDataUrl(canvas.toDataURL()));
        }
    }
    }

    return next(action);
});

/**
 * Notifies this instance about a "Toggle whiteboard" command received by the Jitsi
 * conference.
 *
 * @param {Object} attributes - The attributes carried by the command.
 * @param {string} id - The identifier of the participant who issuing the
 * command. A notable idiosyncrasy to be mindful of here is that the command
 * may be issued by the local participant.
 * @param {Object} store - The redux store. Used to calculate and dispatch
 * updates.
 * @private
 * @returns {void}
 */
function _onToggleWhiteboardCommand(attributes = {}, id, store) {
    const state = store.getState();

    // We require to know who issued the command because (1) only a
    // moderator is allowed to send commands and (2) a command MUST be
    // issued by a defined commander.
    if (typeof id === 'undefined') {
        return;
    }

    const participantSendingCommand = getParticipantById(state, id);

    // The Command(s) API will send us our own commands and we don't want
    // to act upon them.
    if (participantSendingCommand.local) {
        return;
    }

    if (participantSendingCommand.role !== 'moderator') {
        logger.warn('Received toggle-whiteboard command not from moderator');

        return;
    }

    const oldState = state['features/whiteboard'].on;
    const newState = attributes.on === 'true';

    if (oldState !== newState) {
        store.dispatch(toggleWhiteboard(newState));
    }
}

/**
 * Notifies this instance about a "Toggle whiteboard" command received by the Jitsi
 * conference.
 *
 * @param {string} id - The identifier of the participant who issuing the
 * command. A notable idiosyncrasy to be mindful of here is that the command
 * may be issued by the local participant.
 * @param {Object} store - The redux store. Used to calculate and dispatch
 * updates.
 * @private
 * @returns {void}
 */
function _onClearWhiteboardCommand(id, store) {
    const state = store.getState();

    // We require to know who issued the command because (1) only a
    // moderator is allowed to send commands and (2) a command MUST be
    // issued by a defined commander.
    if (typeof id === 'undefined') {
        return;
    }

    const participantSendingCommand = getParticipantById(state, id);

    // The Command(s) API will send us our own commands and we don't want
    // to act upon them.
    if (participantSendingCommand.local) {
        return;
    }

    if (participantSendingCommand.role !== 'moderator') {
        logger.warn('Received clear-whiteboard command not from moderator');

        return;
    }

    store.dispatch(clearWhiteboard(true));
}
