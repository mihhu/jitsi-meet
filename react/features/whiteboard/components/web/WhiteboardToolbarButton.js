// @flow
import { makeStyles } from '@material-ui/core';
import React from 'react';

import { Icon } from '../../../base/icons';
import { Tooltip } from '../../../base/tooltip';

type Props = {
    children?: ReactElement,
    icon?: Object,
    onClick?: Function,
    tooltip: string
}

const useStyles = makeStyles(theme => {
    return {
        button: {
            color: theme.palette.icon01,
            backgroundColor: 'transparent',
            border: 0,
            borderRadius: '4px',
            padding: '6px',
            margin: '4px',

            '&:hover': {
                backgroundColor: theme.palette.icon02
            }
        }
    };
});

const WhiteboardToolbarButton = ({ icon, onClick, tooltip, children }: Props) => {
    const styles = useStyles();

    const button = (<button
        className = { styles.button }
        onClick = { onClick }>
        <Icon
            size = { 20 }
            src = { icon } />
    </button>);

    return (
        <Tooltip
            content = { tooltip }
            position = { 'right' }>
            {children ?? button}
        </Tooltip>
    );
};

export default WhiteboardToolbarButton;
