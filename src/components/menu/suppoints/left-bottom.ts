import { type IContext } from '../../context/context.d';
import { Position } from '../../../position';

export function LeftBottomPosition (): Position {

	return new Position( {

		x: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().left - context.parent.getBoundingClientRect().left;

		},

		y: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().top
				- context.parent.getBoundingClientRect().top
				+ context.activator.getBoundingClientRect().height;

		},

		offsetX: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().width;

		},

		offsetY: () => {

			return 0;

		},

	} );

};
