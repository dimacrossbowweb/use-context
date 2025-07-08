import { type TContextOptions } from '../context/options.d';

export type TContextMenuOptions = Omit<IContextOptions, 'x' | 'y' | 'onInit' | 'onDeinit'>;
