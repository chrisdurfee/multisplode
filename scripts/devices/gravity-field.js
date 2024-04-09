import { ARC, Device } from './device.js';

export class GravityField extends Device
{
    constructor(tmpX, tmpY, color, multiplier)
    {
        this.init(GravityField);

        this.position = { x: math.round(tmpX), y: math.round(tmpY) };
        this.size = 0;
        this.fillColor = color;
        this.audio = 'sound/collisions/collision-1a.mp3';
        this.multiplier = multiplier || 1;

        this.gravity = (1 * this.multiplier);
        this.startTime = null;
        this.time = 8000;
        this.delta = 0;

        this.type = 'gravityField';
        this.explosive = false;

        /* this will get the size and cache
        the rate */
        this.getMaxSize();
        this.cachePath();
    }

    checkToRemove()
    {
        let startTimer = this.getStartTime();
        this.delta = new Date() - startTimer;
        return (this.delta >= this.time)? true : false;
    }

    getStartTime()
    {
        this.startTime = this.startTime || new Date();
        return this.startTime;
    }

    updateParticlePosition(particle)
    {
        /* this will get the  current angle the particle
        is location from the center of the gravity field
        and apply the gravity to the distance */
        let position = this.position;
        let particlePosition = particle.position;
        let orbitDistance = this.distance(particlePosition, position) - this.gravity;
        let distance = orbitDistance - this.gravity;

        /* this will limit the oribit to stay a distance from the center */
        distance = distance > this.orbitLimit? distance : this.orbitLimit;

        let angle = math.updateOrbitAngle(this.getOrbitAngle(particle), particle.speed / this.size);
        position = math.getOrbitPosition(position.x, position.y, angle, distance);

        particlePosition.x = position.x;
        particlePosition.y = position.y;
    }

    getOrbitAngle(particle)
    {
        let position = this.position;
        let particlePosition = particle.position;
        let diffX = particlePosition.x - position.x;
        let diffY = particlePosition.y - position.y;
        return Math.atan2(diffY, diffX);
    }

    distance(p1, p2)
    {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }

    orbitParticle(particle)
    {
        this.updateParticlePosition(particle);
    }

    maxSize = 0;
    totalSize = 0;
    lineSize = 0;

    getMaxSize()
    {
        let currentLevel = Levels.currentLevel;
        if(currentLevel)
        {
            this.maxSize = currentLevel.waveMaxSize * this.multiplier;
            this.size = this.maxSize;

            this.orbitLimit = this.maxSize - (this.maxSize / 3);
        }
    }

    cachePath()
    {
        let self = this,
        maxSize = this.maxSize,
        lineWidth = this.lineSize = 2;
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

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFF';
            ctx.stroke();

            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(position, position, maxSize * 0.2, 0, ARC, true);
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

        let opacity = 1 - this.delta / this.time;

        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = opacity;
        ctx.drawImage(this.cache, -this.half, -this.half);
        ctx.restore();
    }
}