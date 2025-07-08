import { type IContext } from '../../context/context.d';
import { Position } from '../../../position';


export function CenterPosition (): Position {

	return new Position( {

		x: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().left
				- context.parent.getBoundingClientRect().left
				+ context.activator.getBoundingClientRect().width / 2;

		},

		y: ( context: IContext ) => {

			return context.activator.getBoundingClientRect().top
				- context.parent.getBoundingClientRect().top
				+ context.activator.getBoundingClientRect().height / 2;

		},

		offsetX: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().width / 2;

		},

		offsetY: ( context: IContext ) => {

			return -context.context.getBoundingClientRect().height / 2;

		},

	} );

};
