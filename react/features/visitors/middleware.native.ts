import { CONFERENCE_JOINED } from '../base/conference/actionTypes';
import { openDialog } from '../base/dialog/actions';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';
import JoinMeetingDialog from './components/native/JoinMeetingDialog';

import './middleware.any';

MiddlewareRegistry.register(({ dispatch, getState }) => next => action => {
    switch (action.type) {
    case CONFERENCE_JOINED: {

        if (!getState()['features/visitors'].iAmVisitor) {
            dispatch(openDialog(JoinMeetingDialog));
        }

        break;
    }
    }

    return next(action);
});