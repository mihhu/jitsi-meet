/* eslint-disable lines-around-comment */

import type { Dispatch } from 'redux';

// @ts-ignore
import { translate } from '../../../base/i18n';
// @ts-ignore
import { IconShareAudio, IconStopAudioShare } from '../../../base/icons';
// @ts-ignore
import { getLocalParticipant } from '../../../base/participants';
// @ts-ignore
import { connect } from '../../../base/redux';
// @ts-ignore
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
// @ts-ignore
import { setOverflowMenuVisible } from '../../../toolbox/actions.web';
import { toggleWhiteboard } from '../../actions';
import { getWhiteboardId, isWhiteboardEnabled } from '../../functions';


type Props = AbstractButtonProps & {

    /**
     * Whether or not the whiteboard is enabled.
     */
    _enabled: boolean,

    /**
     * The redux {@code dispatch} function.
     */
// @ts-ignore
    dispatch: Dispatch<any>
}

/**
 * Component that renders a toolbar button for the whiteboard.
 */
class WhiteboardButton extends AbstractButton<Props, any, any> {
    accessibilityLabel = 'toolbar.accessibilityLabel.whiteboard';
    icon = IconShareAudio; // TODO: change icons
    label = 'toolbar.whiteboard';
    tooltip = 'toolbar.whiteboard';
    toggledIcon = IconStopAudioShare;
    toggledLabel = 'toolbar.whiteboardEnabled';

    /**
     * Handles clicking / pressing the button, and opens / closes the whiteboard view.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {

        // @ts-ignore
        const { dispatch, _enabled, _id, _localParticipantId } = this.props;
        const id = _enabled ? _id : `whiteboard-${Date.now()}`;
        const participantId = _localParticipantId;

        dispatch(toggleWhiteboard({
            id,
            participantId
        }));
        dispatch(setOverflowMenuVisible(false));
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        // @ts-ignore
        return this.props._enabled;
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state: Object) {

    return {
        _enabled: isWhiteboardEnabled(state),
        _id: getWhiteboardId(state),
        _localParticipantId: getLocalParticipant(state).id
    };
}

// @ts-ignore
export default translate(connect(_mapStateToProps)(WhiteboardButton));
