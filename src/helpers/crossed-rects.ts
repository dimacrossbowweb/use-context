import { type IRect } from '../types';

export function crossedRects( innerRect: Required<IRect>, outerRect: Required<IRect> ): boolean {

	const isLeftInside = innerRect.x >= outerRect.x;
	const isRightInside = ( innerRect.x + innerRect.width ) <= ( outerRect.x + outerRect.width );
	const isTopInside = innerRect.y >= outerRect.y;
	const isBottomInside = ( innerRect.y + innerRect.height ) <= ( outerRect.y + outerRect.height );

	return isLeftInside && isRightInside && isTopInside && isBottomInside;

}
