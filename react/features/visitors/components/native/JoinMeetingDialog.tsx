import React from 'react';
import Dialog from 'react-native-dialog';
import { useTranslation } from 'react-i18next';
import { noop } from 'lodash';
// import { makeStyles } from 'tss-react/mui';
import ReactionMenu from '../../../reactions/components/native/ReactionMenu';

// const useStyles = makeStyles()(theme => {
//     return {
//         raiseHand: {
//             alignItems: 'center',
//             display: 'flex',
//             flexDirection: 'column',
//             marginTop: theme.spacing(3),
//             marginBottom: theme.spacing(3),
//             pointerEvents: 'none'
//         },
//         raiseHandTooltip: {
//             border: '1px solid #444',
//             borderRadius: theme.shape.borderRadius,
//             paddingBottom: theme.spacing(1),
//             paddingTop: theme.spacing(1),
//             paddingLeft: theme.spacing(2),
//             paddingRight: theme.spacing(2)
//         },
//         raiseHandButton: {
//             display: 'inline-block',
//             marginTop: theme.spacing(2),
//             marginBottom: theme.spacing(2),
//             position: 'relative'
//         }
//     };
// });

/**
 * Component that renders the join meeting dialog for visitors.
 *
 * @returns {JSX.Element}
 */
export default function JoinMeetingDialog() {
    const { t } = useTranslation();

    return (
        <Dialog.Container
            coverScreen = { false }
            visible = { true }>
            <Dialog.Title>{ t('visitors.joinMeeting.title') }</Dialog.Title>
            <Dialog.Description>{ t('visitors.joinMeeting.description') }</Dialog.Description>
            <ReactionMenu onCancel = { noop } overflowMenu = { false } />
            <Dialog.Description>{t('visitors.joinMeeting.wishToSpeak')}</Dialog.Description>
            <Dialog.Button
                label = { t('dialog.Understood') }
                onPress = { noop } />
        </Dialog.Container>
    );
}
