import { type IContext } from '../../context/context.d';
import { Position } from '../../../position';

export function LeftCenterPosition (): Position {

	return new Position( {

		x: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().left - context.parent.getBoundingClientRect().left;

		},

		y: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().top
				- context.parent.getBoundingClientRect().top
				+ context.activator.getBoundingClientRect().height / 2;

		},

		offsetX: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().width;

		},

		offsetY: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().height / 2;

		},

	} );

};
