
import { Injectable } from '@angular/core';
import { Category } from '../entities/category.entity';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable()
export class CategoryService {

    private categories: Category[];
        
     constructor(private http: HttpClient) {
     }
 
     findAll(): Observable<Category[]> {
        return this.http.get<Category[]>("http://localhost:3000/categories").pipe(
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
}