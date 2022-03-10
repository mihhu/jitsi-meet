// @flow

import { ReducerRegistry } from '../base/redux';

import {
    ADD_STROKE,
    CLEAR_WHITEBOARD,
    END_WHITEBOARD,
    START_WHITEBOARD,
    TOGGLE_WHITEBOARD
} from './actionTypes';

/**
 * Initial state of whiteboard's part of Redux store.
 */
const INITIAL_STATE = {

    /**
     * The indicator which determines whether the whiteboard mode is on.
     *
     * @type {boolean}
     */
    on: false,

    /**
     * The current strokes on the whiteboard.
     */
    strokes: []
};

ReducerRegistry.register(
    'features/whiteboard',
    (state: Object = INITIAL_STATE, action: Object) => {
        switch (action.type) {
        case START_WHITEBOARD:
            return {
                ...state,
                on: true
            };
        case END_WHITEBOARD:
            return {
                ...state,
                on: false
            };
        case TOGGLE_WHITEBOARD:
            return {
                ...state,
                on: action.on
            };
        case CLEAR_WHITEBOARD:
            return {
                ...state,
                strokes: []
            };
        case ADD_STROKE:
            return {
                ...state,
                strokes: [
                    ...state.strokes,
                    action.stroke
                ]
            };
        }

        return state;
    });
