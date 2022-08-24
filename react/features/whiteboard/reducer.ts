// @ts-ignore
import { ReducerRegistry } from '../base/redux';

// @ts-ignore
import { DISABLE_WHITEBOARD, ENABLE_WHITEBOARD, SET_USERNAME_STATUS } from './actionTypes';

export interface IWhiteboardState {

    collabLink: { roomId: string; roomKey: string }|null,

    /**
     * The indicator which determines whether the whiteboard mode is on.
     *
     * @type {boolean}
     */
    enabled: boolean,

    /**
     * The current whiteboard id.
     *
     * @type {string|null}
     */
    id: string|null,

    participantId: string|null
}

const DEFAULT_STATE: IWhiteboardState = {
    collabLink: null,
    enabled: false,
    id: null,
    participantId: null
};

export interface WhiteboardAction extends Partial<IWhiteboardState> {

    collabLink: { roomId: string; roomKey: string },

    /**
     * The whiteboard id.
     */
    id: string,

    participantId: string|null,

    /**
     * The action type.
     */
    type: string,

    usernameStatus: string // TODO: change to enum
}

ReducerRegistry.register(
    'features/whiteboard',
    (state: IWhiteboardState = DEFAULT_STATE, action: WhiteboardAction) => {
        switch (action.type) {
        case ENABLE_WHITEBOARD:
            return {
                ...state,
                enabled: true,
                id: action.id,
                participantId: action.participantId,
                collabLink: action.collabLink
            };
        case DISABLE_WHITEBOARD:
            return {
                ...state,
                enabled: false,
                id: null,
                participantId: null
            };
        case SET_USERNAME_STATUS:
            return {
                ...state,
                usernameStatus: action.usernameStatus
            };
        }

        return state;
    });
