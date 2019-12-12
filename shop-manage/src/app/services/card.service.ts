
import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Item } from '../entities/item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class CardService {

    private products: Product[];

    constructor(private http: HttpClient) {

    }
    Url = 'http://localhost:3000/orders';

    addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.Url, order, this.httpOptions);

    }
    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(this.Url, order+"/"+order._id, this.httpOptions);
    }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'my-auth-token'
        })
    };

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

}

