/* eslint-disable import/order */
/* eslint-disable require-jsdoc */

import { batch } from 'react-redux';
import { generateCollaborationLinkData } from '@excalidraw/excalidraw';

// @ts-ignore
import { IStore } from '../app/types';

// @ts-ignore
import { setTileView } from '../video-layout';
import {
    getLocalParticipant,
    PARTICIPANT_LEFT,
    participantJoined,
    participantLeft,
    pinParticipant

    // @ts-ignore
} from '../base/participants';

// @ts-ignore
import { getCurrentConference } from '../base/conference/functions';
import { CONFERENCE_JOIN_IN_PROGRESS } from '../base/conference/actionTypes';

// @ts-ignore
import { MiddlewareRegistry, StateListenerRegistry } from '../base/redux';

import { TOGGLE_WHITEBOARD } from './actionTypes';
import { getCollabLink, getWhiteboardId, isWhiteboardEnabled } from './functions';
import { WHITEBOARD, WHITEBOARD_PARTICIPANT_NAME, WHITEBOARD_STORAGE_KEY } from './constants';
import { disableWhiteboard, enableWhiteboard, setUsernameStatus } from './actions';
import { PARTICIPANT_UPDATED } from '../base/participants/actionTypes';

declare let APP: any;

/**
 * Middleware which intercepts whiteboard actions to handle changes to the related state.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
MiddlewareRegistry.register((store: IStore) => (next: Function) => async (action: any) => {
    const { dispatch, getState } = store;
    const state = getState();
    const localParticipantId = getLocalParticipant(state)?.id;

    switch (action.type) {
    case TOGGLE_WHITEBOARD: {
        const conference = getCurrentConference(state);
        const isEnabled = isWhiteboardEnabled(state);
        let collabLink = null;

        if (!isEnabled) {
            collabLink = getCollabLink(state);
            collabLink = !collabLink
                ? await generateCollaborationLinkData()
                : collabLink;
        }

        dispatch(setTileView(false));
        sendWhiteboardCommand({
            ...(collabLink ? { roomId: collabLink?.roomId, roomKey: collabLink?.roomKey } : {}),
            conference,
            participantId: localParticipantId,
            whiteboardId: action.id,
            isEnabled: !isEnabled
        });

        break;
    }
    case CONFERENCE_JOIN_IN_PROGRESS: {
        const { conference } = action;

        // @ts-ignore
        conference.addCommandListener(WHITEBOARD, ({ value, attributes }) => {
            handleWhiteboardStatus(store, conference, value, attributes);
        });
        break;
    } // TODO: cleanup PARTICIPANT_DISPLAY_NAME_CHANGED
    case PARTICIPANT_UPDATED: {
        if (typeof APP !== 'undefined') {
            const participant = getLocalParticipant(store.getState());

            if (participant
                && participant.id === action.participant.id
                && action.participant.name
                && participant.name !== action.participant.name) {
                localStorage.setItem(
                    WHITEBOARD_STORAGE_KEY,
                    JSON.stringify({ username: action.participant.name })
                );
                dispatch(setUsernameStatus('NEW')); // TODO: make enum
            }
        }
        break;
    }
    case PARTICIPANT_LEFT: {
        const whiteboardId = getWhiteboardId(state);

        if (action.participant.id === whiteboardId) {
            dispatch(disableWhiteboard());
        }
        break;
    }
    }

    return next(action);
});

/**
 * Set up state change listener to perform maintenance tasks when the conference
 * is left or failed, e.g. Close the whiteboard if it's left open.
 */
StateListenerRegistry.register(

    // @ts-ignore
    state => getCurrentConference(state),

    // @ts-ignore
    (conference, { dispatch }, previousConference): void => {
        if (previousConference) {

            // TODO: clear whiteboard content too
            dispatch(disableWhiteboard());
        }
    });


/**
 * Handles the whiteboard state.
 *
 * @param {Store} store - The redux store.
 * @param {JitsiConference} conference - The current conference.
 * @param {string} whiteboardId - The current whiteboard id.
 * @param {Object} attributes - The command attributes.
 * @returns {void}
 */

// @ts-ignore
function handleWhiteboardStatus(store: IStore, conference, whiteboardId: string, { isEnabled, roomId, roomKey, from }) {
    const { dispatch, getState } = store;

    if (isEnabled === 'false') {
        dispatch(participantLeft(whiteboardId, conference));

        return;
    }

    const isAlreadyEnabled = isWhiteboardEnabled(getState());
    if (isAlreadyEnabled) {
        return;
    }

    const username = getLocalParticipant(getState())?.name;

    localStorage.setItem(
        WHITEBOARD_STORAGE_KEY,
        JSON.stringify({ username })
    );

    batch(() => {
        dispatch(participantJoined({
            conference,
            id: whiteboardId,
            isFakeParticipant: true,
            name: WHITEBOARD_PARTICIPANT_NAME
        }));
        dispatch(pinParticipant(whiteboardId));
        dispatch(enableWhiteboard({
            id: whiteboardId,
            participantId: from,
            collabLink: {
                roomId,
                roomKey
            }
        }));
    });
}

/**
 * Sends the WHITEBOARD command.
 *
 * @returns {void}
 */
// @ts-ignore
const sendWhiteboardCommand = ({ conference, whiteboardId, participantId, isEnabled, roomId, roomKey }: {
    conference: any,
    whiteboardId: string,
    participantId?: string,
    isEnabled: boolean,
    roomId?:string,
    roomKey?: string
}): void => {
    conference.sendCommandOnce(WHITEBOARD, {
        value: whiteboardId,
        attributes: {
            roomId,
            roomKey,
            from: participantId,
            isEnabled
        }
    });
};
