import { valueOf } from '../../../helpers';
import { Position } from '../../../position';

export function TopLeftPosition (): Position {

	return new Position( {

		x: ( context: any ) => {

			return valueOf( context?.activator?.getBoundingClientRect()?.left )
				- valueOf( context?.parent?.getBoundingClientRect()?.left );

		},

		y: ( context: any ) => {

			return valueOf( context?.activator?.getBoundingClientRect()?.top )
				- valueOf( context?.parent?.getBoundingClientRect()?.top );

		},

		offsetX: ( context: any ) => {

			return 0;

		},

		offsetY: ( context: any ) => {

			return -valueOf( context?.context?.getBoundingClientRect()?.height );

		},

	} );

};
