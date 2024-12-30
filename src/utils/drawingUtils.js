export const drawLine = (context, start, end) => {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
};

export const clearCanvas = (context, canvas) => {
    context.fillStyle = '#f8f7f2';
    context.fillRect(0, 0, canvas.width, canvas.height);
};