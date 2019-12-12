import { Category } from './category.entity';

export class Product {
    _id:string;
    name: string;
    description: string;
    weight: number;
    price: number;
    category: Category

}