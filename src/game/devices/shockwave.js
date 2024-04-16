import { ARC, Device } from './device.js';

export class ShockWave extends Device
{
    constructor(tmpX, tmpY, color, multiplier)
    {
        super(tmpX, tmpY, color, multiplier);

        this.size = 0;

        /*let files =
        [
            'collision-1a.mp3',
            'collision-1b.mp3',
            'collision-1c.mp3',
            'collision-1d.mp3'
        ];
        let file = files[math.round(Math.random() * files.length - 1)];*/
        this.audio = 'sound/collisions/collision-1a.mp3';

        this.type = 'shockWave';
        this.explosive = true;

        /* this will get the current wave scale and cache
        the rate */
        this.getWaveScale();
        this.cachePath();
    }

    /*increase shock wave size*/
    updateSize()
    {
        this.size += this.waveScale;
    }

    checkToRemove()
    {
        return (this.size >= this.maxSize);
    }

    waveScale = 0;
    maxSize = 0;
    totalSize = 0;
    lineSize = 0;

    getWaveScale()
    {
        let currentLevel = Levels.currentLevel;
        if(currentLevel)
        {
            this.waveScale = currentLevel.waveScale;
            this.maxSize = currentLevel.waveMaxSize * this.multiplier;
        }
    }

    cachePath()
    {
        let self = this,
        maxSize = this.maxSize,
        lineWidth = this.lineSize = maxSize / 10;
        let size = this.totalSize = (maxSize * 2) + (lineWidth * 2);
        this.half = this.totalSize / 2;

        function callBack(ctx)
        {
            let position = size / 2;

            ctx.beginPath();
            ctx.arc(position, position, maxSize, 0, ARC, true);

            ctx.globalAlpha = 0.3;
            ctx.fillStyle = self.fillColor;
            ctx.fill();

            ctx.globalAlpha = 0.5;

            ctx.beginPath();
            ctx.arc(position, position, maxSize * .3, 0, ARC, true);
            ctx.fillStyle = self.fillColor;
            ctx.fill();

            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(position, position, maxSize * .6, 0, ARC, true);
            ctx.fillStyle = self.fillColor;
            ctx.fill();

            ctx.globalAlpha = 1;
        }
        this.cache = Cache.add(callBack, size, size);
    }

    draw(ctx)
    {
        let x = this.position.x,
        y = this.position.y;

        this.updateSize();

        let scale = this.size / this.maxSize;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.drawImage(this.cache, -this.half, -this.half);
        ctx.restore();
    }
}