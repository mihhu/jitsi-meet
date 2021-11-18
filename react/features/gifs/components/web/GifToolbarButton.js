// @flow

import { translate } from '../../../base/i18n';
import { IconGifs } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
import { getGifsMenuVisibility } from '../../functions';

/**
 * The type of the React {@code Component} props of {@link GifToolbarButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * Whether or not is toggled.
     */
    toggled: boolean,

    /**
     * The Redux dispatch function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for toggling the camera facing mode.
 */
class GifToolbarButton extends AbstractButton<Props, any> {
    accessibilityLabel = 'toolbar.accessibilityLabel.gifs';
    icon = IconGifs;
    label = 'toolbar.gifs';

    /**
     * Handles clicking/pressing the button.
     *
     * @returns {void}
     */
    _handleClick() {
        const { handleClick } = this.props;

        if (handleClick) {
            handleClick();

            return;
        }
    }

    /**
     * Whether this button is toggled or not.
     *
     * @returns {boolean}
     */
    _isToggled() {
        return this.props.toggled;
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
        toggled: getGifsMenuVisibility(state)
    };
}

export default translate(connect(mapStateToProps)(GifToolbarButton));
