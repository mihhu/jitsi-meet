// @flow

import { ReducerRegistry } from '../base/redux';

import {
    ADD_STROKE,
    CHANGE_COLOR,
    CLEAR_WHITEBOARD,
    END_WHITEBOARD,
    SAVE_INITIAL_DIMENSIONS,
    START_WHITEBOARD,
    TOGGLE_WHITEBOARD
} from './actionTypes';

/**
 * Initial state of whiteboard's part of Redux store.
 */
const INITIAL_STATE = {

    /**
     * Current color.
     *
     * @type {string}
     */
    color: '#000',

    /**
     * The initial dimensions of the whiteboard.
     */
    dimensions: null,

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
        case SAVE_INITIAL_DIMENSIONS:
            return {
                ...state,
                dimensions: action.dimensions
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
        case CHANGE_COLOR:
            return {
                ...state,
                color: action.color
            };
        }

        return state;
    });
