import { 
    
	type IPosition,
    type IRect,
    type TAnimationCallback,

} from '../../types';

export interface IContext {

	position: IPosition;

	hide: TAnimationCallback;
    show: TAnimationCallback;
	
	/**
	 * Hooks
	 */
	onInit: () => any;

	onDeinit: () => any;

	onUpdate: () => any;

	onShow: TAnimationCallback;

	onHide: TAnimationCallback;

};
