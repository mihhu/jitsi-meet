// @flow

import { translate } from '../../../base/i18n';
import { IconCameraRefresh } from '../../../base/icons';
import { isLocalParticipantModerator } from '../../../base/participants';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
import { endWhiteboard, isWhiteboardOn, startWhiteboard } from '../../../whiteboard';

/**
 * The type of the React {@code Component} props of {@link ToggleWhiteboardButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether the whiteboard is on or not.
     */
    _whiteboardOn: boolean,

    /**
     * The Redux dispatch function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for toggling the camera facing mode.
 */
class ToggleWhiteboardButton extends AbstractButton<Props, any> {
    accessibilityLabel = 'toolbar.accessibilityLabel.toggleCamera'; // ! Change these
    icon = IconCameraRefresh;
    label = 'toolbar.toggleCamera';
    toggledLabel = 'toolbar.stopScreenSharing';
    tooltip = 'toolbar.accessibilityLabel.shareYourScreen';

    /**
     * Handles clicking/pressing the button.
     *
     * @returns {void}
     */
    _handleClick() {
        const { dispatch, _whiteboardOn } = this.props;

        dispatch(_whiteboardOn ? endWhiteboard() : startWhiteboard());
    }

    /**
     * Whether this button is disabled or not.
     *
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._whiteboardOn;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code ToggleCameraButton} component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function mapStateToProps(state): Object {

    return {
        _whiteboardOn: isWhiteboardOn(state),
        visible: isLocalParticipantModerator(state)
    };
}

export default translate(connect(mapStateToProps)(ToggleWhiteboardButton));
