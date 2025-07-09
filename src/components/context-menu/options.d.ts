import { type TContextOptions } from '../context/options.d';

export interface IContextMenuOptions extends Omit<IContextOptions, 'x' | 'y' | 'onInit' | 'onDeinit'> {

	/**
	 * menu open direction
	 */
	direction: TDirection;

};
