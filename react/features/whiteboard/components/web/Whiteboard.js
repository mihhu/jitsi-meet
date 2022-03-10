// @flow

import { throttle } from 'lodash';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rough from 'roughjs/bundled/rough.esm';

import { addStroke, getWhiteboardStrokes } from '../..';

const generator = rough.generator();

const usePreviousDimensions = dimensions => {
    const ref = useRef();

    useEffect(() => {
        ref.current = dimensions;
    }, [ dimensions ]);

    return ref.current;
};

type Props = { // TODO - add comments for each prop
    dimensions: Object,
    tool: string
}

const Whiteboard = ({ dimensions, tool }: Props) => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const previousDimensions = usePreviousDimensions(dimensions);
    const [ points, setPoints ] = useState([]);
    const [ drawing, setDrawing ] = useState(false);
    const strokes = useSelector(getWhiteboardStrokes);

    const createStroke = useCallback(() => {
        return {
            content: generator.linearPath(points),
            points,
            type: tool
        };
    }, [ points, tool ]);

    useLayoutEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        contextRef.current = canvasRef.current.getContext('2d');
        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height);
        contextRef.current.imageSmoothingQuality = 'medium';
        contextRef.current.fillColor = 'black';

        if (previousDimensions && (
            previousDimensions.width !== dimensions.width
                || previousDimensions.height !== dimensions.height)
        ) {
            const previousCanvas = contextRef.current.getImageData(
                0,
                0,
                previousDimensions.width,
                previousDimensions.height
            );
            const xScale = dimensions.width / previousDimensions.width;
            const yScale = dimensions.height / previousDimensions.height;

            // canvasRef.current.width = dimensions.width;
            // canvasRef.current.height = dimensions.height;
            contextRef.current.scale(xScale, yScale);
            contextRef.current.putImageData(previousCanvas, 0, 0);
        }

        canvasRef.current.width = dimensions.width;
        canvasRef.current.height = dimensions.height;
        const roughCanvas = rough.canvas(canvasRef.current);

        strokes.forEach(s => roughCanvas.draw(s.content));
    }, [ canvasRef, contextRef, strokes, dimensions, previousDimensions, rough ]);

    const startDrawing = useCallback(({ clientX, clientY }) => {
        setDrawing(true);
        setPoints([ [ clientX, clientY ] ]);
        contextRef.current.moveTo(clientX, clientY);
    }, [ contextRef.current ]);

    const finishDrawing = useCallback(() => {
        dispatch(addStroke(createStroke(), dimensions));
        setDrawing(false);

        setPoints([]);
    }, [ dispatch, addStroke, createStroke, dimensions ]);

    const draw = useCallback(({ clientX, clientY }, _contextRef, _points) => {
        _contextRef.current.lineTo(clientX, clientY);
        _contextRef.current.stroke();
        setPoints([ ..._points, [ clientX, clientY ] ]);
    }, []);

    const throttledDraw = useCallback(throttle((e, _contextRef, _points) => {
        draw(e, _contextRef, _points);
    }, 50, { leading: true }), []);

    return (
        <canvas
            height = { dimensions.height }
            onMouseDown = { startDrawing }
            // eslint-disable-next-line react/jsx-no-bind
            onMouseMove = { e => drawing
                && throttledDraw(e, contextRef, points) }
            onMouseUp = { finishDrawing }
            ref = { canvasRef }
            width = { dimensions.width } />
    );
};

export default Whiteboard;
