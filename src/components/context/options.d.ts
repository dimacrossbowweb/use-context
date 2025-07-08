import {

    type IOptions,
    type TAxisPos,
    type TAnimationCallback,

} from '../../types';

export interface IContextOptions extends IOptions {

	/**
	 * parent
	 */
	parent: HTMLElement | string;

    /**
     * display
     */
    display: boolean;

    /**
     * position x
     */
    x: TAxisPos;

    /**
     * position y
     */
    y: TAxisPos;

    /**
     * offset x
     */
    offsetX: TAxisPos;

    /**
     * offset y
     */
    offsetY: TAxisPos;

    /**
     * Hooks
     */

    /**
     * fires on init
     */
    onInit: () => any;

    /**
     * fires on deinit
     */
    onDeinit: () => any;

    /**
     * fire on update
     */
    onUpdate: () => any;

    /**
     * fires on context showing
     */
    onShow: TAnimationCallback;

    /**
     * fires on context hiding
     */
    onHide: TAnimationCallback;

};
