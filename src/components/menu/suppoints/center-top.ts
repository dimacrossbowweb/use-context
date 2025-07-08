import { type IContext } from '../../context/context.d';
import { Position } from '../../../position';


export function CenterTopPosition (): Position {

	return new Position( {

		x: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().left
				- context.parent.getBoundingClientRect().left
				+ context.activator.getBoundingClientRect().width / 2;

		},

		y: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().top - context.parent.getBoundingClientRect().top;

		},

		offsetX: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().width / 2;

		},

		offsetY: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().height;

		},

	} );

};
