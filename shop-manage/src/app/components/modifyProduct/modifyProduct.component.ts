import { Product } from '../../entities/product.entity';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/entities/category.entity';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: 'index.component.html',
    styles: ['h1 { font-weight: normal; }'],

})

export class ModifyProductComponent implements OnInit {

    private categories: Category[];
    selectedCategory: Category;
    private _name: string;
    private _description: string;
    private _weight: number;
    private _price: number;
    private products: Product[];
    get name(): string {
        return this._name;
    }
    get description(): string {
        return this._description;
    }
    get weight(): number {
        return this._weight;
    }
    get price(): number {
        return this._price;
    }

    set name(value: string) {
        this._name = value;
    }
    set description(value: string) {
        this._description = value;
    }
    set weight(value: number) {
        this._weight = value;
    }
    set price(value: number) {
        this._price = value;
    }
    private product: Product;
    private routeSub: Subscription;
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private route: ActivatedRoute
    ) {
    }
    confirm() {
        this.product.description = this.description;
        this.product.name = this.name;
        this.product.weight = this.weight;
        this.product.price = this.price;
        this.product.category = this.selectedCategory;
        this.productService.updateProduct(this.product).subscribe(
            data => {
               console.log(data);
              }
        );
        console.log("put");
    }
    onChangeObj(newObj) {
        console.log(newObj);
        this.selectedCategory = newObj;
    }
    private getSelectedIndex(id: string) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

    async ngOnInit() {
        this.categoryService.findAll().subscribe(
            cat => {
                this.categories = cat;
            }
        );
        this.routeSub = this.route.params.subscribe(params => {
            this.productService.findAll().subscribe(
                prod => {
                    this.products = prod;
                    this.product = this.products[this.getSelectedIndex(params['id'])]
                    this.name = this.product.name;
                    this.description = this.product.description;
                    this.weight = this.product.weight;
                    this.price = this.product.price;
                    this.selectedCategory = this.product.category;
                }
            );
        });
    }


}