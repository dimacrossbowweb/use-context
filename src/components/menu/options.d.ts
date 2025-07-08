import { type IContextOptions } from '../context/options.d';

export const DIRECTIONS_LIST: string[] = [

	'left-top', 'left-center', 'left-bottom',
	'center-top', 'center', 'center-bottom',
	'right-top', 'right-center', 'right-bottom'

];

export type TDirection = typeof DIRECTIONS_LIST[ number ];

export interface IMenuOptions extends Omit<IContextOptions, 'x' | 'y'> {

	/**
	 * activator element
	 */
	activator: HTMLElement | string;

	/**
	 * menu open direction
	 */
	direction: TDirection;

};
