// @flow

import { makeStyles } from '@material-ui/core';
import { throttle } from 'lodash';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rough from 'roughjs/bundled/rough.esm';

import { addStroke, getInitialWhiteboardDimensions, getWhiteboardStrokes } from '../..';

const useStyles = makeStyles(() => {
    return {
        whiteboard: {
            position: 'absolute'
        }
    };
});

const generator = rough.generator();

type Props = { // TODO - add comments for each prop
    dimensions: Object,
    tool: string
}

const Whiteboard = ({ dimensions, tool }: Props) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [ points, setPoints ] = useState([]);
    const [ drawing, setDrawing ] = useState(false);
    const initialDimensions = useSelector(getInitialWhiteboardDimensions);
    const strokes = useSelector(getWhiteboardStrokes);

    const getOffsetCoordinates = useCallback(({ clientX, clientY }, _initialDimensions, _dimensions) => {
        const x = clientX - _dimensions.left;
        const y = clientY - _dimensions.top;

        if (_initialDimensions.width === _dimensions.width
            && _initialDimensions.height === _dimensions.height
            && _initialDimensions.top === _dimensions.top
            && _initialDimensions.left === _dimensions.left) {
            return {
                x,
                y
            };
        }
        const scaleFactor = _initialDimensions.width / _dimensions.width;

        return {
            x: x * scaleFactor,
            y: y * scaleFactor
        };
    }, []);

    const createStroke = useCallback(() => ({
        points,
        type: tool
    }), [ points, tool ]);

    useLayoutEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        contextRef.current = canvasRef.current.getContext('2d');
        contextRef.current.clearRect(
            dimensions.left,
            dimensions.top,
            canvasRef.current.width,
            canvasRef.current.height);
        contextRef.current.imageSmoothingQuality = 'medium';
        contextRef.current.fillColor = 'black';
        canvasRef.current.width = dimensions.width;
        canvasRef.current.height = dimensions.height;

        if (initialDimensions && (
            initialDimensions.width !== dimensions.width
                || initialDimensions.height !== dimensions.height
                || initialDimensions.top !== dimensions.top
                || initialDimensions.left !== dimensions.left)
        ) {
            const previousCanvas = contextRef.current.getImageData(
                initialDimensions.left,
                initialDimensions.top,
                initialDimensions.width,
                initialDimensions.height
            );
            const xScale = dimensions.width / initialDimensions.width;
            const yScale = dimensions.height / initialDimensions.height;

            canvasRef.current.width = dimensions.width;
            canvasRef.current.height = dimensions.height;

            contextRef.current.scale(xScale, yScale);
            contextRef.current.putImageData(
                previousCanvas,
                dimensions.left,
                dimensions.top
            );
        }

        const roughCanvas = rough.canvas(canvasRef.current);
        strokes.forEach(s => roughCanvas.draw(generator.linearPath(s.points)));
    }, [ canvasRef, contextRef, strokes, dimensions, initialDimensions, rough ]);

    const startDrawing = useCallback(({ clientX, clientY }) => {
        setDrawing(true);

        const { x, y } = getOffsetCoordinates({
            clientX,
            clientY
        }, initialDimensions, dimensions);

        setPoints([ [ x, y ] ]);
        contextRef.current.moveTo(x, y);
    }, [ contextRef.current, initialDimensions, dimensions ]);

    const finishDrawing = useCallback(() => {
        dispatch(addStroke(createStroke()));
        setDrawing(false);

        setPoints([]);
    }, [ dispatch, addStroke, createStroke, dimensions ]);

    const draw = useCallback(({ clientX, clientY }, _contextRef, _points, _initialDimensions, _dimensions) => {
        const { x, y } = getOffsetCoordinates({
            clientX,
            clientY
        }, _initialDimensions, _dimensions);

        _contextRef.current.lineTo(x, y);
        _contextRef.current.stroke();
        setPoints([ ..._points, [ x, y ] ]);
    }, []);

    const throttledDraw = useCallback(throttle((e, _contextRef, _points, _initialDimensions, _dimensions) => {
        draw(e, _contextRef, _points, _initialDimensions, _dimensions);
    }, 50, { leading: true }), []);

    return (
        <canvas
            className = { styles.whiteboard }
            height = { dimensions.height }
            onMouseDown = { startDrawing }
            // eslint-disable-next-line react/jsx-no-bind
            onMouseMove = { e => drawing
                && throttledDraw(e, contextRef, points, initialDimensions, dimensions) }
            onMouseUp = { finishDrawing }
            ref = { canvasRef }
            width = { dimensions.width } />
    );
};

export default Whiteboard;
