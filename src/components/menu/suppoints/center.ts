import { valueOf } from '../../../helpers';
import { Position } from '../../../position';

export function CenterPosition (): Position {

	return new Position( {

		x: ( context: any ) => {

			return valueOf( context?.activator?.getBoundingClientRect()?.left )
				- valueOf( context?.parent?.getBoundingClientRect()?.left )
				+ valueOf( context?.activator?.getBoundingClientRect()?.width ) / 2;

		},

		y: ( context: any ) => {

			return valueOf( context?.activator?.getBoundingClientRect()?.top )
				- valueOf( context?.parent?.getBoundingClientRect()?.top )
				+ valueOf( context?.activator?.getBoundingClientRect()?.height ) / 2;

		},

		offsetX: ( context: any ) => {

			return -valueOf( context?.context?.getBoundingClientRect()?.width ) / 2;

		},

		offsetY: ( context: any ) => {

			return -valueOf( context?.context?.getBoundingClientRect()?.height ) / 2;

		},

	} );

};
