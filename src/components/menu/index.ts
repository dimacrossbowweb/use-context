import { Context } from '../../components/context';
import { getElement } from '../../helpers';
import { type IMenu } from './menu.d';
import {
	
	type IPosition,

} from '../../types';
import {

	DIRECTIONS_LIST,

	type TDirection,
	type IMenuOptions,

} from './options.d';

import {
	
	LeftTopPosition,
	LeftCenterPosition,
	LeftBottomPosition,

	RightTopPosition,
	RightCenterPosition,
	RightBottomPosition,

	TopLeftPosition,
	TopCenterPosition,
	TopRightPosition,

	BottomLeftPosition,
	BottomCenterPosition,
	BottomRightPosition,

	CenterPosition,

} from './suppoints';

export class Menu extends Context implements IMenu {

	points!: Map<string, IPosition>;

	private _activator!: HTMLElement;

	private _direction!: TDirection;

	private _marginX!: string | number;
	private _marginY!: string | number;
	
	constructor (
		
		context: HTMLElement | string,
		options: Partial<IMenuOptions>
	
	) {

		super( context, options );

		try {

			const activatorElement: HTMLElement | null = getElement( options?.activator ?? 'body' );

			if ( !activatorElement ) {

				throw new Error( 'Context -> constructor :: invalid activator element' );

			}

			/**
			 * @todo remove
			 */

			this._activator = activatorElement;

			this._direction = options?.direction ?? 'bottom-left';

			this._marginX = options?.marginX ?? 0;
			this._marginY = options?.marginY ?? 0;

			this.points = new Map([

				[ 'left-top', LeftTopPosition() ],
				[ 'left-center', LeftCenterPosition() ],
				[ 'left-bottom', LeftBottomPosition() ],

				[ 'right-top', RightTopPosition() ],
				[ 'right-center', RightCenterPosition() ],
				[ 'right-bottom', RightBottomPosition() ],

				[ 'top-left', TopLeftPosition() ],
				[ 'top-center', TopCenterPosition() ],
				[ 'top-right', TopRightPosition() ],

				[ 'bottom-left', BottomLeftPosition() ],
				[ 'bottom-center', BottomCenterPosition() ],
				[ 'bottom-right', BottomRightPosition() ],

				[ 'center', CenterPosition() ],

			]);

			this.position = this.points.get( this._direction ) ?? BottomLeftPosition();

			this.init();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	/**
	 * Initializations events
	 */
	override onInit (): any {

		this.addEvents();
	
	}

	/**
	 * Deinitializations events
	 */
	override onDeinit (): any {

		this.removeEvents();

	}

    private addEvents (): void {

        this.activator.addEventListener( 'click', this.onClick.bind( this ) );

        document.addEventListener( 'click', this.onClickOutside.bind( this ) );

    }

	private removeEvents (): void {

		this.activator.removeEventListener( 'click', this.onClick.bind( this ) );

		document.removeEventListener( 'click', this.onClickOutside.bind( this ) );

	}

	private onClick ( e: MouseEvent ) {

		e.preventDefault();

		this.display = true;

	}

	private onClickOutside ( e: MouseEvent ) {

		if (
			
			!this.context.contains( e.target as Node ) 
			&& !this.activator.contains( e.target as Node )
		
		) {

			this.display = false;

		}

	}

	get activator (): HTMLElement {

		return this._activator;
		
	}

	set activator ( el: HTMLElement | string ) {

		try {

			const element: HTMLElement | null = getElement( el );

			if ( !element ) {

				throw new Error( 'Menu -> setting activator element :: invalid element' );

			}

			this._activator = element;

			this.deinit().then( () => {

				this.init();

			} );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get direction (): TDirection {

		return this._direction;

	}

	set direction ( value: TDirection ) {

		try {

			if ( typeof value !== 'string' || !DIRECTIONS_LIST.includes( value ) ) {

				throw new Error( 'Menu -> setting direction :: invalid value' );

			}

			this._direction = value;

			this.position = this.points.get( this._direction ) ?? BottomLeftPosition();

			this.update();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get marginX (): number {

		if ( typeof this.position.x === 'number' ) return this.position.x;

		if ( typeof this.position.x === 'string' && !isNaN(+this.position.x) ) return +this.position.x;

		return 0;

	}

	set marginX ( value: string | number ) {

		try {

			if ( ![ 'string', 'number' ].includes( typeof value ) ) {

				throw new Error( 'Context -> setting marginX :: invalid value. Exprected number or function that returns number' );

			}

			this.position.marginX = value;

			this.update();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get marginY (): number {

		if ( typeof this.position.y === 'number' ) return this.position.y;

		if ( typeof this.position.y === 'string' && !isNaN(+this.position.y) ) return +this.position.y;

		return 0;

	}

	set marginY ( value: string | number ) {

		try {

			if ( ![ 'string', 'number' ].includes( typeof value ) ) {

				throw new Error( 'Context -> setting marginY :: invalid value. Exprected number or function that returns number' );

			}

			this.position.marginY = value;

			this.update();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};
