// @ts-ignore
import { ReducerRegistry } from '../base/redux';

// @ts-ignore
import { DISABLE_WHITEBOARD, ENABLE_WHITEBOARD } from './actionTypes';

export interface IWhiteboardState {

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
    id: string|null
}

const DEFAULT_STATE: IWhiteboardState = {
    enabled: false,
    id: null
};

export interface WhiteboardAction extends Partial<IWhiteboardState> {

    /**
     * The whiteboard id.
     */
    id: string,

    /**
     * The action type.
     */
    type: string
}

ReducerRegistry.register(
    'features/whiteboard',
    (state: IWhiteboardState = DEFAULT_STATE, action: WhiteboardAction) => {
        switch (action.type) {
        case ENABLE_WHITEBOARD:
            return {
                ...state,
                enabled: true,
                id: action.id
            };
        case DISABLE_WHITEBOARD:
            return {
                ...state,
                enabled: false,
                id: null
            };
        }

        return state;
    });
