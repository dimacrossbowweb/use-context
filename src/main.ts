import { Menu } from './components/menu';
import gsap from 'gsap';

document.addEventListener( 'DOMContentLoaded', () => {

    const context: Menu = new Menu( '#context', {

        parent: '#app',

		activator: '#btn',

		direction: 'center',

		// parent: '',

        onShow ( context: HTMLElement ) {

            gsap.fromTo( context, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'linear' });

        },

        onHide ( context: HTMLElement, resolve: Function ) {

            gsap.to( context, { opacity: 0, duration: 0.4, ease: 'linear' })
                .then(() => {
			
                    resolve();
			
                });


        }

    } );

	document.getElementById('selector').addEventListener('change', function() {
        context.direction = this.value;
    });

    // setInterval( () => {

	// 	const el = document.getElementById( 'btn' );

	// 	if ( el ) {
		
	// 		el.innerText = Math.round( Math.random() * 50000000 );

	// 	}
	
	// }, 1000 );

} );
