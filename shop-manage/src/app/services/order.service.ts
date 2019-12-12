import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Order[]> {
        return this.http.get<Order[]>("http://localhost:3000/orders").pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>("http://localhost:3000/orders/"+order._id,order ,this.httpOptions).pipe(catchError(this.handleError));
    }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private handleError(err: HttpErrorResponse) {

        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {

            errorMessage = `An error occurred: ${err.error.message}`;
        } else { 
            errorMessage = `Server returned code: ${err.status}, incorrect status modification`;
        }
        alert(errorMessage);
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}