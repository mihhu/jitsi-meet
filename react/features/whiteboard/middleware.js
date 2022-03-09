// @flow
import { CONFERENCE_WILL_JOIN, getCurrentConference } from '../base/conference';
import { getLocalParticipant, getParticipantById, isLocalParticipantModerator } from '../base/participants';
import { MiddlewareRegistry } from '../base/redux';
import { setTileView } from '../video-layout';

import { ADD_STROKE, END_WHITEBOARD, START_WHITEBOARD, TOGGLE_WHITEBOARD } from './actionTypes';
import { toggleWhiteboard } from './actions';
import { ENDPOINT_WHITEBOARD_STROKE_NAME, TOGGLE_WHITEBOARD_COMMAND } from './constants';
import { isWhiteboardOn } from './functions';
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

        if (conference && !action.received) { // ! and not alone in conf
            console.log('\n\n\n send \n\n\n', action);
            conference.sendEndpointMessage('', {
                name: ENDPOINT_WHITEBOARD_STROKE_NAME,
                stroke: action.stroke,
                dimensions: action.dimensions,
                participantId: getLocalParticipant(state).id,
                timestamp: Date.now()
            });
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
