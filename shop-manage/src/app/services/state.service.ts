
import { Injectable } from '@angular/core';
import { Category } from '../entities/category.entity';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { State } from '../entities/state.entity';

@Injectable()
export class StateService {

    private states: State[];
        
     constructor(private http: HttpClient) {
     }
 
     findAll(): Observable<State[]> {
        return this.http.get<State[]>("http://localhost:3000/states").pipe(
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