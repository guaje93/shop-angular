import { Item } from './item.entity';
import { State } from './state.entity';

export class Order {

    _id:string;
    products: Item[];
    userName: string;
    userEmail: string;
    userPhone: string;
    state: State;
    loadedState: State;
    total: number;
    isValid: boolean = false;
    date: String;
}