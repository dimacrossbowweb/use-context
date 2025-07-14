import { type IContextOptions } from '../context/options.d';

export const DIRECTIONS_LIST: string[] = [

	'left-top', 'left-center', 'left-bottom',
	'top-left', 'top-center', 'top-right',
	'right-top', 'right-center', 'right-bottom',
	'bottom-left', 'bottom-center', 'bottom-right',
	'center',

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

	/**
	 * margin x
	 */
	marginX: string | number;

	/**
	 * margin y
	 */
	marginY: string | number;

};
