import { GravityField } from "./gravity-field.js";
import { ShockWave } from "./shockwave.js";

/**
 * @type {object} DeviceMap
 */
const DeviceMap = {
	ShockWave,
	GravityField
};

/**
 * Devices
 *
 * This will manage the devices that are created
 * and removed from the game.
 *
 * @type {object} Devices
 */
export const Devices =
{
	/**
	 * @type {array} devices
	 */
	devices: [],

	/**
	 * @type {array} removed
	 */
	removed: [],

	/**
	 * This will reset the devices.
	 *
	 * @returns {void}
	 */
	reset()
	{
		this.explosives = 0;
		this.devices = [];
		this.removed = [];
	},

	/**
	 * This will get the number of explosives.
	 *
	 * @return {number}
	 */
	explosives: 0,

	/**
	 * This will get the number of explosives.
	 *
	 * @returns {number}
	 */
	getExplosivesCount()
	{
		return this.explosives;
	},

	/**
	 * This will get all the devices.
	 *
	 * @returns {array}
	 */
	getAll()
	{
		return this.devices;
	},

	/**
	 * This will add a new device to the devices array.
	 *
	 * @param {number} tmpX
	 * @param {number} tmpY
	 * @param {string} color
	 * @param {boolean} multiplier
	 * @param {string} type
	 * @returns {object}
	 */
	add(tmpX, tmpY, color, multiplier, type = 'ShockWave')
	{
		const deviceType = DeviceMap[type] || DeviceMap.ShockWave;
		const device = new deviceType(tmpX, tmpY, color, multiplier);
		if (device.explosive === true)
		{
			this.explosives++;
		}

		//sounds.add(device.audio, type);
		const devices = this.devices;
		devices[devices.length] = (device);
		return device;
	},

	/**
	 * This will remove a device from the devices array.
	 *
	 * @param {object} device
	 * @returns {void}
	 */
	remove(device)
	{
		let devices = this.devices,
		index = devices.indexOf(device);
		if (index > -1)
		{
			devices.splice(index, 1);
			/* we need to add to the removed array to
			delay the gc durring gameplay */
			let removed = this.removed;
			removed[removed.length] = device;
		}
	},

	/**
	 * This will draw all the devices.
	 *
	 * @param {object} ctx
	 * @returns {void}
	 */
	draw(ctx)
	{
		ctx.globalCompositeOperation = 'lighter';
		const devices = this.devices;
		for (let i = (devices.length - 1); i >= 0; i--)
		{
			let device = devices[i];
			if (device.checkToRemove() === true)
			{
				if (device.explosive === true)
				{
					this.explosives--;
				}
				//remove object from wave array
				this.remove(device);
			}
			else
			{
				//update explosion position
				device.draw(ctx);
			}
		}
		ctx.globalCompositeOperation = 0;
	}
};