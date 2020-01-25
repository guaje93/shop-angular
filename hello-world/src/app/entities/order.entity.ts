import { Item } from './item.entity';
import { State } from './state.entity';

export class Order {

    products: Item[];
    userName: string;
    userEmail: string;
    userPhone: string;
    state: State;
}