import { valueOf } from '../../../helpers';
import { Position } from '../../../position';

export function LeftBottomPosition (): Position {

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

			return -valueOf( context?.context?.getBoundingClientRect()?.width )
				+ valueOf( context?.marginX );

		},

		offsetY: ( context: any ) => {

			return valueOf( context?.marginY );

		},

	} );

};
