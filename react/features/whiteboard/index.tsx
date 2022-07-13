/* eslint-disable import/order */
/* eslint-disable lines-around-comment */

import { Excalidraw } from '@excalidraw/excalidraw';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

// @ts-ignore
import Filmstrip from '../../../modules/UI/videolayout/Filmstrip';
// @ts-ignore
import { getVerticalViewMaxWidth } from '../filmstrip/functions.web';
// @ts-ignore
import { getToolboxHeight } from '../toolbox/functions.web';
// @ts-ignore
import { shouldDisplayWhiteboard } from './functions';
// @ts-ignore
import { shouldDisplayTileView } from '../video-layout/functions.any';


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

    const shouldDisplay = useSelector(shouldDisplayWhiteboard);
    const isInTileView = useSelector(shouldDisplayTileView);
    const { clientHeight, clientWidth } = useSelector((state: any) => state['features/base/responsive-ui']);
    const { visible: filmstripVisible, isResizing } = useSelector((state: any) => state['features/filmstrip']);
    const filmstripWidth: number = useSelector(getVerticalViewMaxWidth);

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
                        <Excalidraw
                            isCollaborating = { true }
                            ref = { excalidrawRef }
                            theme = 'dark' />
                    </div>
                )
            }
        </div>
    );
};

export default Whiteboard;
