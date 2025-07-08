import {
	
	type TAxisPos,
	type IPosition,

} from './types';

export class Position implements IPosition {

	x!: TAxisPos;
	y!: TAxisPos;
	offsetX!: TAxisPos;
	offsetY!: TAxisPos;

	constructor ( options: Partial<IPosition> = {} ) {

		try {

			this.x = options?.x ?? 0;
			this.y = options?.y ?? 0;
			this.offsetX = options?.offsetX ?? 0;
			this.offsetY = options?.offsetY ?? 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};
