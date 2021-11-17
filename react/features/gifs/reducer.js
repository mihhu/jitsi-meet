
import { ReducerRegistry } from '../base/redux';

import {
    ADD_GIF_FOR_PARTICIPANT,
    HIDE_GIF_FOR_PARTICIPANT,
    REMOVE_GIF_FOR_PARTICIPANT,
    TOGGLE_GIFS_VISIBLE
} from './actionTypes';

const initialState = {
    gifList: new Map(),
    visible: false
};

ReducerRegistry.register(
    'features/gifs',
    (state = initialState, action) => {
        switch (action.type) {
        case ADD_GIF_FOR_PARTICIPANT: {
            const newList = state.gifList;

            newList.set(action.participantId, {
                gifUrl: action.gifUrl,
                timeoutID: action.timeoutID
            });

            return {
                gifList: newList
            };
        }
        case REMOVE_GIF_FOR_PARTICIPANT: {
            const newList = state.gifList;

            newList.delete(action.participantId);

            return {
                gifList: newList
            };
        }
        case HIDE_GIF_FOR_PARTICIPANT: {
            const newList = state.gifList;
            const gif = state.gifList.get(action.participantId);

            newList.set(action.participantId, {
                gifUrl: gif.gifUrl,
                timeoutID: action.timeoutID
            });

            return {
                gifList: newList
            };
        }
        case TOGGLE_GIFS_VISIBLE:
            return {
                ...state,
                visible: !state.visible
            };
        }

        return state;
    });

