export type TCondition = ( ...args: any ) => boolean;

export class ConditionManager {

	private _conditions!: Map< string, TCondition >;

	constructor () {

		this._conditions = new Map();

	}

	add ( name: string, condition: TCondition ): this {

		try {

			if ( typeof name !== 'string' ) {

				throw new Error( 'ConditionManager -> add :: invalid name. Expected string' );

			}

			if ( typeof condition !== 'function' ) {

				throw new Error( 'ConditionManager -> add :: invalid condition callback. Expected function' );

			} 

			this._conditions.set( name, condition );

		} catch ( e: unknown ) {

			console.error( e );

		}

		return this;

	}

	remove ( name: string ): this {

		try {

			if ( typeof name !== 'string' ) {

				throw new Error( 'ConditionManager -> remove :: invalid name. Expected string' );

			}

			this._conditions.delete( name );

		} catch ( e: unknown ) {

			console.error( e );

		}

		return this;

	}

	is ( name: string, ...args: any ): boolean {

		if ( this._conditions.has( name ) ) {

			const callback = this._conditions.get( name );

			if ( typeof callback === 'function' ) return callback( args );

		}

		return false;

	}

};
