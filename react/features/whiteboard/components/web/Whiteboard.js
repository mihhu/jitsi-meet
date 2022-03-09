// @flow

import { throttle } from 'lodash';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm';

const generator = rough.generator();

const Whiteboard = ({ dimensions, settings }) => {
    const canvasRef = useRef(null);
    const [ elements, setElements ] = useState([]);
    const [ drawing, setDrawing ] = useState(false);

    const createElement = useCallback((x1, y1, x2, y2) => ({
        content: generator.line(x1, y1, x2, y2),
        settings,
        x1,
        x2,
        y1,
        y2
    }), [ generator ]);

    useLayoutEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const context = canvasRef.current.getContext('2d');    
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const roughCanvas = rough.canvas(canvasRef.current);
        elements.forEach(e => roughCanvas.draw(e.content));
    }, [ elements ]);

    const startDrawing = ({ clientX, clientY }) => {
        setDrawing(true);

        const element = createElement(clientX, clientY, clientX, clientY);
        setElements([ ...elements, element ]);
    };

    const finishDrawing = () => {
        setDrawing(false);
    };

    const draw = ({ clientX, clientY }) => {
        if (!drawing) {
            return;
        }

        const index = elements.length - 1;
        const { x1, y1 } = elements[index];

        const updatedElement = createElement(x1, y1, clientX, clientY);
        setElements([
            ...elements.slice(0, index),
            updatedElement, 
            ...elements.slice(index + 1)
        ]);

    };

    return (
        <canvas
            height = { dimensions.height }
            onMouseDown = { startDrawing }
            onMouseMove = { throttle(draw, 500) }
            onMouseUp = { finishDrawing }
            ref = { canvasRef }
            width = { dimensions.width } />
    );
};

export default Whiteboard;
