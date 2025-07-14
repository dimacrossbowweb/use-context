import { Context } from '../context';
import { type IContextMenuOptions } from './options.d';

export class ContextMenu extends Context {

	constructor ( context: HTMLElement | string, options: Partial<IContextMenuOptions> ) {

		super( context, options );

		this.init();

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

        this.parent.addEventListener( 'contextmenu', this.onContext.bind( this ) );

        document.addEventListener( 'click', this.onClickOutside.bind( this ) );

    }

	private removeEvents (): void {

		this.parent.removeEventListener( 'contextmenu', this.onContext.bind( this ) );

		document.removeEventListener( 'click', this.onClickOutside.bind( this ) );

	}

	private onContext ( e: MouseEvent ) {

		e.preventDefault();

		this.x = e.clientX - this.parent.getBoundingClientRect().left;
		this.y = e.clientY - this.parent.getBoundingClientRect().top;

		this.display = true;

	}

	private onClickOutside ( e: MouseEvent ) {

		if ( !this.context.contains( e.target as Node ) ) {

			this.display = false;

		}

	}

};
