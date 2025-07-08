import { type IContext } from '../../context/context.d';
import { Position } from '../../../position';


export function LeftTopPosition (): Position {

	return new Position( {

		x: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().left - context.parent.getBoundingClientRect().left;

		},

		y: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().top - context.parent.getBoundingClientRect().top;

		},

		offsetX: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().width;

		},

		offsetY: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().height;

		},

	} );

};
