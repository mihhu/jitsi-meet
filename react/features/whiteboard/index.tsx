/* eslint-disable import/order */
/* eslint-disable lines-around-comment */

/* eslint-ignore */
// @ts-ignore
import { ExcalidrawApp } from '@excalidraw/excalidraw';

import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

// @ts-ignore
import Filmstrip from '../../../modules/UI/videolayout/Filmstrip';
// @ts-ignore
import { getVerticalViewMaxWidth } from '../filmstrip/functions.web';
// @ts-ignore
import { getToolboxHeight } from '../toolbox/functions.web';
// @ts-ignore
import { getCollabLink, getUsernameStatus, shouldDisplayWhiteboard } from './functions';
// @ts-ignore
import { shouldDisplayTileView } from '../video-layout/functions.any';

import { setUsernameStatus } from './actions';
// @ts-ignore
import { getLocalParticipant } from '../base/participants';

const HEIGHT_OFFSET = 80;

declare const interfaceConfig: any;

interface IDimensions {

    /* The height of the component. */
    height: string,

    /* The width of the component. */
    width: string
}

/**
 * The Whiteboard component.
 *
 * @returns {JSX.Element} - The React component.
 */
const Whiteboard: () => JSX.Element = () => {
    const excalidrawRef = useRef<any>(null);
    const collabAPIRef = useRef<any>(null);
    const dispatch = useDispatch();

    const shouldDisplay = useSelector(shouldDisplayWhiteboard);
    const isInTileView = useSelector(shouldDisplayTileView);
    const { clientHeight, clientWidth } = useSelector((state: any) => state['features/base/responsive-ui']);
    const { visible: filmstripVisible, isResizing } = useSelector((state: any) => state['features/filmstrip']);
    const filmstripWidth: number = useSelector(getVerticalViewMaxWidth);
    const collabLink = useSelector(getCollabLink);
    // @ts-ignore
    const localParticipantName: string = useSelector(getLocalParticipant).name;
    const usernameStatus = useSelector(getUsernameStatus);

    useEffect(() => {
        if (!collabAPIRef.current || usernameStatus !== 'NEW') {
            return;
        }

        collabAPIRef.current.setUsername(localParticipantName);
        dispatch(setUsernameStatus('UPDATED'));
    }, [ usernameStatus ]);

    /**
    * Computes the width and the height of the component.
    *
    * @returns {IDimensions} - The dimensions of the component.
    */
    const getDimensions = (): IDimensions => {
        let width: number;
        let height: number;

        if (interfaceConfig.VERTICAL_FILMSTRIP) {
            if (filmstripVisible) {
                width = clientWidth - filmstripWidth;
            } else {
                width = clientWidth;
            }
            height = clientHeight - getToolboxHeight();
        } else {
            if (filmstripVisible) {
                height = clientHeight - Filmstrip.getFilmstripHeight();
            } else {
                height = clientHeight;
            }
            width = clientWidth;
        }

        return {
            width: `${width}px`,
            height: `${height - HEIGHT_OFFSET}px`
        };
    };

    const getCollabAPI = useCallback(collabAPI => {
        if (collabAPIRef.current) {
            return;
        }
        collabAPIRef.current = collabAPI;
    }, []);

    return (
        <div
            className = { clsx(isResizing && 'disable-pointer', 'whiteboard-container') }
            style = {{
                ...getDimensions(),
                marginTop: `${HEIGHT_OFFSET}px`,
                display: `${isInTileView ? 'none' : 'block'}`
            }}>
            {
                shouldDisplay && (
                    <div className = 'excalidraw-wrapper'>
                        <ExcalidrawApp
                            collabLink = { collabLink }
                            collabUrl = 'https://oss-collab-us2.excalidraw.com'
                            excalidraw = {{
                                hideUserList: true,
                                isCollaborating: true,
                                // @ts-ignore
                                ref: excalidrawRef,
                                theme: 'dark'
                            }}
                            getCollabAPI = { getCollabAPI } />
                    </div>
                )
            }
        </div>
    );
};

export default Whiteboard;
