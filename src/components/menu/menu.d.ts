import { 
	
	type IPosition,

} from '../../types';
import { type IContext } from '../context/context.d';

export interface IMenu extends IContext {

	points: Map<string, IPosition>;

};
