
import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class ProductService {

    private products: Product[];

    constructor(private http: HttpClient) {

    }

    getPromise(): Promise<Product[]> { return this.http.get<Product[]>("http://localhost:3000/products").toPromise(); }
    findAll(): Observable<Product[]> {
        return this.http.get<Product[]>("http://localhost:3000/products").pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {

        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {

            errorMessage = `An error occurred: ${err.error.message}`;
        } else {

            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'        })
    };

    updateProduct(product: Product) {
        const url = "http://localhost:3000/products" + "/" + product._id;
        const data = JSON.stringify(product,["name","description","weight","price","category"]);
        return this.http.put(url, product);
    }


    find(id: string): Product {
        this.findAll().subscribe(
            prod => {
                this.products = prod;
                return this.products[this.getSelectedIndex(id)];
            }
        );
        return this.products[this.getSelectedIndex(id)];
    }

    private getSelectedIndex(id: string) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

}