import React from 'react';
import { useTranslation } from 'react-i18next';
import { noop } from 'lodash';

import Dialog from '../../../base/ui/components/web/Dialog';
import { IconArrowUp } from '../../../base/icons/svg';
import { RaiseHandButton } from '../../../reactions/components/web/RaiseHandButton';
import ToolboxButtonWithPopup from '../../../base/toolbox/components/web/ToolboxButtonWithPopup';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme => {
    return {
        raiseHand: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            pointerEvents: 'none'
        },
        raiseHandTooltip: {
            border: '1px solid #444',
            borderRadius: theme.shape.borderRadius,
            paddingBottom: theme.spacing(1),
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        raiseHandButton: {
            display: 'inline-block',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            position: 'relative'
        }
    };
});

/**
 * Component that renders the join meeting dialog for visitors.
 *
 * @returns {JSX.Element}
 */
export default function JoinMeetingDialog() {
    const { t } = useTranslation();
    const { classes } = useStyles();

    return (
        <Dialog
            ok = {{ translationKey: 'dialog.Understood' }}
            cancel = {{ hidden: true }}
            titleKey = 'visitors.joinMeeting.title'>
            <div className = 'join-meeting-dialog'>
                <p>{t('visitors.joinMeeting.description')}</p>
                <div className = { classes.raiseHand }>
                    <p className = { classes.raiseHandTooltip }>{t('visitors.joinMeeting.raiseHand')}</p>
                    <div className = { classes.raiseHandButton }>
                        <ToolboxButtonWithPopup
                            icon = { IconArrowUp }
                            iconDisabled = { false }
                            onPopoverClose = { noop }
                            onPopoverOpen = { noop }
                            popoverContent = { null }
                            visible = { false }>
                                <RaiseHandButton
                                    disableClick = { true }
                                    raisedHand = { true } />
                        </ToolboxButtonWithPopup>
                    </div>
                </div>
                <p>{t('visitors.joinMeeting.wishToSpeak')}</p>
            </div>
        </Dialog>
    );
}
