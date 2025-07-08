import { type IRect } from '../types';

export function containToRect( innerRect: Required<IRect>, outerRect: Required<IRect> ): IRect {

	const rect: IRect = {

		x: 0,
		y: 0,
		width: 0,
		height: 0,

	};

	if ( innerRect.x < outerRect.x ) {

		rect.x = outerRect.x;

		rect.width = innerRect.width <= outerRect.width ? innerRect.width : outerRect.width;

	} else if ( ( innerRect.x + innerRect.width ) > ( outerRect.x + outerRect.width ) ) {

		rect.width = innerRect.width <= outerRect.width ? innerRect.width : outerRect.width;
		rect.x = outerRect.x + outerRect.width - rect.width;

	} else {

		rect.x = innerRect.x;
		rect.width = ( innerRect.x + innerRect.width ) > ( outerRect.x + outerRect.width ) ? outerRect.width - innerRect.x : innerRect.width;

	}

	if ( innerRect.y < outerRect.y ) {

		rect.y = outerRect.y;
		rect.height = innerRect.height <= outerRect.height ? innerRect.height : outerRect.height;

	} else if ( ( innerRect.y + innerRect.height ) > ( outerRect.y + outerRect.height ) ) {

		rect.height = innerRect.height <= outerRect.height ? innerRect.height : outerRect.height;
		rect.y = outerRect.y + outerRect.height - rect.height;

	} else {

		rect.y = innerRect.y;
		rect.height = ( innerRect.y + innerRect.height ) > ( outerRect.y + outerRect.height ) ? outerRect.height - innerRect.y : innerRect.height;

	}

	return rect;

}
