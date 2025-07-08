export function getElement( el: HTMLElement | string ): HTMLElement | null {

	if ( el instanceof HTMLElement ) {

		return el;

	}

	if ( typeof el === 'string' ) {

		const element = document.querySelector( el );

		if ( element instanceof HTMLElement ) {

			return element;

		}

	}

	return null;

}
