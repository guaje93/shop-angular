import { Component, OnInit } from '@angular/core';

import { Product } from '../../entities/product.entity';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/entities/category.entity';
import { log } from 'util';
import { from } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import { Item } from 'src/app/entities/item.entity';

@Component({
	templateUrl: 'index.component.html',
	styles: ['h1 { font-weight: normal; }'],
	styleUrls: ['./product.component.css']

})

export class ProductComponent implements OnInit {

	private products: Product[];
	private categories: Category[];
	private selectedCategory: Category;
	private filteredProducts: Product[];
	_listFilter: string = '';

	get listFilter(): string {
		return this._listFilter;
	}


	onChangeObj(newObj) {
		console.log(newObj);
		this.selectedCategory = newObj;
		this.filteredProducts = (this.listFilter) ? this.doFilter(this.listFilter) : this.products;
		this.filteredProducts = this.filteredProducts.filter((prod: Product) =>
			prod.category.name == newObj.name);
	}

	set listFilter(value: string) {
		this._listFilter = value;
		this.filteredProducts = (this.listFilter) ? this.doFilter(this.listFilter) : this.products;
	}
	constructor(
		private productService: ProductService,
		private categoryService: CategoryService
	) {
	}


	modifyProduct(id) {
		
	
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
		var p = await this.productService.getPromise();
		this.productService.findAll().subscribe(
			prod => {
				this.products = prod;
				this.filteredProducts = this.products;

			}
		);
		this.categoryService.findAll().subscribe(
			cat => {
				this.categories = cat;
			}
		);

		this.listFilter = '';
	}



	handleError(handleError: any): import("rxjs").OperatorFunction<Product, any> {
		throw new Error("Method not implemented.");
	}

	doFilter(filterBy: string): Product[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((prod: Product) =>
			prod.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
	}


}