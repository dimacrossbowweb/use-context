import { type IOptions } from './options.d';
import { type TAxisPos } from './axis-pos.d';

export interface IPosition extends IOptions {

	/**
	 * position x
	 */
	x: TAxisPos;

	/**
	 * position y
	 */
	y: TAxisPos;

	/**
	 * offset x
	 */
	offsetX: TAxisPos;

	/**
	 * offset y
	 */
	offsetY: TAxisPos;

};
