import { 
    
	type IPosition,
    type IRect,
	type TAxisPos,

} from '../../types';
import { Position } from '../../position';
import { getElement, containToRect } from '../../helpers';
import { type IContext } from './context.d';
import { type IContextOptions } from './options.d';
import './style.css';

export abstract class Context implements IContext {

	private _context!: HTMLElement;
	private _parent!: HTMLElement;

	private _display!: boolean;

	public position: IPosition = new Position();

	protected _ro!: ResizeObserver | null;

	constructor (
		
		context: HTMLElement | string,
        options: Partial<IContextOptions> = {},

	) {

		try {

			const contextElement: HTMLElement | null = getElement( context );

			if ( !contextElement ) {

				throw new Error( 'Context -> constructor :: invalid context element' );

			}

			const parentElement: HTMLElement | null = getElement( options?.parent ?? 'body' );

			if ( !parentElement ) {

				throw new Error( 'Context -> constructor :: invalid parent element' );

			}

			this._context = contextElement;
			this._parent = parentElement;

            this._display = options?.display ?? false;

            this._context.classList.toggle( 'use-context_display_hide', !this._display );

            this.x = options?.x ?? 0;
            this.y = options?.y ?? 0;

            this.offsetX = options?.offsetX ?? 0;
            this.offsetY = options?.offsetY ?? 0;

			this.onInit = options?.onInit ?? this.onInit;
			this.onDeinit = options?.onDeinit ?? this.onDeinit;
			this.onUpdate = options?.onUpdate ?? this.onUpdate;
            this.onShow = options?.onShow ?? this.onShow;
            this.onHide = options?.onHide ?? this.onHide;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}


	/**
	 * Initializations events
	 * @returns Promise<any>
	 */
	protected init (): Promise<any> {

		return new Promise( ( resolve, reject ) => {

			try {

                this._context.classList.add( 'use-context' );

				window.addEventListener( 'resize', this.update.bind( this ) );
				window.addEventListener( 'scroll', this.update.bind( this ) );

				this._ro = new ResizeObserver( this.update.bind( this ) );

				this._ro.observe( this._parent );
				this._ro.observe( this._context );
				
				/**
				 * Calling onInit hook
				 */
				this.onInit();

				resolve( this );

			} catch ( e: unknown ) {

				reject( e );

			}

		} );

	}

	/**
	 * Deinitializations events
	 * @returns Promise<any>
	 */
	protected deinit (): Promise<any> {

		return new Promise( ( resolve, reject ) => {

			try {

				if ( !( this._ro instanceof ResizeObserver ) ) {

					throw new Error( 'Context -> deinit :: cannot deinit events cause ResizeObserver is not found' );

				} 

				window.removeEventListener( 'resize', this.update );
				window.removeEventListener( 'scroll', this.update );

				this._ro.disconnect();

				/**
				 * Calling onDeinit hook
				 */
				this.onDeinit();

				resolve( this );

			} catch ( e: unknown ) {

				reject( e );

			}

		} );

	}

	/**
	 * Updating context position and sizes
	 */
	protected update() {

		try {

			if ( !( this._parent instanceof HTMLElement ) ) {

				throw new Error( 'Context -> onUpdate :: invalid parent element' );

			}

			if ( !( this._context instanceof HTMLElement ) ) {

				throw new Error( 'Context -> onUpdate :: invalid contex element' );

			}

			const windowRect: IRect = {

				x: 0,
				y: 0,
				width: window.innerWidth,
				height: window.innerHeight 

			};

			const parentRect: IRect = {

				x: this._parent.getBoundingClientRect().x,
				y: this._parent.getBoundingClientRect().y,
				width: this._parent.getBoundingClientRect().width,
				height: this._parent.getBoundingClientRect().height,

			};

			const contextRect: IRect = {

				x: parentRect.x + this.x + this.offsetX,
				y: parentRect.y + this.y + this.offsetY,
				width: this._context.getBoundingClientRect().width,
				height: this._context.getBoundingClientRect().height,

			};

			const containRect: IRect = containToRect( 
					
				containToRect( contextRect, parentRect ),  
				windowRect

			);

			this._context.style.left = `${ containRect.x }px`;
			this._context.style.top = `${ containRect.y }px`;

			/**
			 * Calling onUpdate hook
			 */
			this.onUpdate();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	/**
	 * Fires on context showing
	 */
	show (): Promise<any> {

        return new Promise( resolve => {

            this.onShow( this.context, resolve );

        } );

    }

	/**
	 * Fires on context hiding
	 */
	hide (): Promise<any> {

        return new Promise( resolve => {

            this.onHide( this.context, resolve );

        } );

    }

	/**
	 * Hooks
	 */

	/**
	 * Fires on initialization
	 */
	onInit (): void {}

	/**
	 * Fires on Deinitialization
	 */
	onDeinit (): void {}

	/**
	 * Fires on environment updating
	 */
	onUpdate (): void {}

	/**
	 * Fires on context showing
	 */
	onShow ( context: HTMLElement, resolve?: Function, reject?: Function ): any {};

	/**
	 * Fires on context hiding
	 */
	onHide ( context: HTMLElement, resolve?: Function, reject?: Function ): any {};

	/**
	 * Getters/Setters
	 */

	get display (): boolean {

		return this._display;

	}

	set display ( value: boolean ) {

		try {

			if ( typeof value !== 'boolean' ) {

				throw new Error( 'Context -> setting display :: invalid value. Expected boolean' );

			}

            if ( this._display === value ) return;

            this._display = value;

            if ( this._display ) {

                this.context.classList.remove( 'use-context_display_hide' );

				this.update();

                this.show();


            } else {

                this.hide().then( () => {

                    this.context.classList.add( 'use-context_display_hide' );

                } );

            }

            

		} catch ( e: unknown ) {

			console.error( e )

		}

	}

	get x (): number {

		if ( typeof this.position.x === 'number' ) return this.position.x;

		if ( typeof this.position.x === 'function' ) {

			const value = this.position.x.bind( this )( this );

			if ( typeof value === 'number' ) return value;

		}

		return 0;

	}

	set x ( value: TAxisPos ) {

		try {

			if ( ![ 'function', 'number' ].includes( typeof value ) ) {

				throw new Error( 'Context -> setting x :: invalid value. Exprected number or function that returns number' );

			}

			this.position.x = value;

			this.update();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get y (): number {

		if ( typeof this.position.y === 'number' ) return this.position.y;

		if ( typeof this.position.y === 'function' ) {

			const value = this.position.y.bind( this )( this );

			if ( typeof value === 'number' ) return value;

		}

		return 0;

	}

	set y ( value: TAxisPos ) {

		try {

			if ( ![ 'function', 'number' ].includes( typeof value ) ) {

				throw new Error( 'Context -> setting y :: invalid value. Exprected number or function that returns number' );

			}

			this.position.y = value;

			this.update();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get offsetX (): number {

		if ( typeof this.position.offsetX === 'number' ) return this.position.offsetX;

		if ( typeof this.position.offsetX === 'function' ) {

			const value = this.position.offsetX.bind( this )( this );

			if ( typeof value === 'number' ) return value;

		}

		return 0;

	}

	set offsetX ( value: TAxisPos ) {

		try {

			if ( ![ 'function', 'number' ].includes( typeof value ) ) {

				throw new Error( 'Context -> setting offsetX :: invalid value. Exprected number or function that returns number' );

			}

			this.position.offsetX = value;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get offsetY (): number {

		if ( typeof this.position.offsetY === 'number' ) return this.position.offsetY;

		if ( typeof this.position.offsetY === 'function' ) {

			const value = this.position.offsetY.bind( this )( this );

			if ( typeof value === 'number' ) return value;

		}

		return 0;

	}

	set offsetY ( value: TAxisPos ) {

		try {

			if ( ![ 'function', 'number' ].includes( typeof value ) ) {

				throw new Error( 'Context -> setting offsetY :: invalid value. Exprected number or function that returns number' );

			}

			this.position.offsetY = value;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get parent (): HTMLElement {

		return this._parent;
		
	}

	set parent ( el: HTMLElement | string ) {

		try {

			const element: HTMLElement | null = getElement( el );

			if ( !element ) {

				throw new Error( 'Context -> setting parent element :: invalid element' );

			}

			this._parent = element;

			this.deinit().then( () => {

				this.init();

			} );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	get context (): HTMLElement {

		return this._context;
		
	}

	set context ( el: HTMLElement | string ) {

		try {

			const element: HTMLElement | null = getElement( el );

			if ( !element ) {

				throw new Error( 'Context -> setting context element :: invalid element' );

			}

			this._context = element;

			this.deinit().then( () => {

				this.init();

			} );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};
