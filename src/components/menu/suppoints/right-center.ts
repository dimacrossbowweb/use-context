import { type IContext } from '../../context/context.d';
import { Position } from '../../../position';


export function RightCenterPosition (): Position {

	return new Position( {

		x: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().left
				- context.parent.getBoundingClientRect().left
				+ context.activator.getBoundingClientRect().width;

		},

		y: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().top
				- context.parent.getBoundingClientRect().top
				+ context.activator.getBoundingClientRect().height / 2;

		},

		offsetX: () => {

			return 0;

		},

		offsetY: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().height / 2;

		},

	} );

};
