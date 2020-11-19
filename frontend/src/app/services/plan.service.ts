import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
const serviceUrl = 'http://localhost:8080/api/plans';

@Injectable({
    providedIn: 'root'
})

export class PlanService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(serviceUrl);
    }

    get(pId): Observable<any> {
        return this.http.get(`${serviceUrl}/${pId}`);
    }

    //getByUser

    create(pData): Observable<any> {
        return this.http.post(serviceUrl, pData);
    }

    update(pData): Observable<any> {
        return this.http.put(serviceUrl, pData);
    }

    delete(pId): Observable<any> {
        return this.http.delete(`${serviceUrl}/${pId}`);
    }
}
