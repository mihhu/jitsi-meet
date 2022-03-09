// @flow

import React from 'react';

const WhiteboardToolbar = ({ selectTool }) => {
    return (
        <div>
            <div>Clear</div>
            <div>Eraser</div>
            <div>Fill color</div>
            <div>Stroke color</div>
            <div>Weight</div>
            <div>
                <div>Tools</div>
                <div onClick = { selectTool }>
                    <div tool = 'pencil'>Pencil</div>
                    <div tool = 'pen'>Pen</div>
                </div>
            </div>
        </div>
    );
};

export default WhiteboardToolbar;
