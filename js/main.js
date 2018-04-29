const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let cw, ch;
let resolution = window.devicePixelRatio || 1;
let waves = [];

resizeCanvas();

function resizeCanvas() {
    cw = window.innerWidth;
    ch = window.innerHeight;

    canvas.width  = cw * resolution;
    canvas.height = ch * resolution;

    canvas.style.width  = cw + 'px';
    canvas.style.height = ch + 'px';

    ctx.scale(resolution, resolution);
}

window.addEventListener('resize', resizeCanvas);

function init() {
    waves.push(
        // new Wave(ctx, {
        //     amplitude: 45,
        //     fill: 'rgba(255, 255, 255, 0.08)',
        //     frequency: 3,
        //     phase: 0,
        //     pos: {
        //         x: cw,
        //         y: ch * 0.9
        //     },
        //     segments: 150,
        //     // speed: 200
        // }),
        // new Wave(ctx, {
        //     amplitude: 45,
        //     fill: 'rgba(255, 255, 255, 0.2)',
        //     frequency: 2,
        //     phase: 0,
        //     pos: {
        //         x: cw,
        //         y: ch * 0.9
        //     },
        //     segments: 150,
        //     // speed: 150
        // }),
        // new Wave(ctx, {
        //     amplitude: 45,
        //     fill: 'rgba(255, 255, 255, 0.4)',
        //     frequency: 1.5,
        //     phase: 0,
        //     pos: {
        //         x: cw,
        //         y: ch * 0.9
        //     },
        //     segments: 150,
        //     // speed: 100
        // }),
        new Wave(ctx, {
            amplitude: 45,
            fill: 'rgba(255, 255, 255, 0.6)',
            frequency: 1.5,
            phase: 0,
            pos: {
                x: cw,
                y: ch * 0.9
            },
            segments: 150,
            speed: 0.5
        })
    );

    draw();
}

function Wave(context, props) {
    const { amplitude, fill, frequency, phase, pos, segments, speed } = props;
    let frames = 0;
    let phi, x, y;

    this.update = function() {
        frames++;
        phi = (frames * speed) / 60;

        context.beginPath();
        context.moveTo(cw, ch);

        for (let i = 0; i <= segments; i++) {
            y = Math.sin((toRad(frequency) * i - phi) + phase) * amplitude;
            context.lineTo(cw - (cw / segments) * i, y + pos.y);
        }

        context.lineTo(0, ch);
        context.closePath();
        context.fillStyle = fill;
        context.fill();
    }
}

function draw() {
    ctx.clearRect(0, 0, cw, ch);
    waves.forEach(wave => wave.update());

    requestId = window.requestAnimationFrame(draw);
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}

function toDeg(rad) {
    return rad * (180 / Math.PI);
}

init();
