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

    create(pData): Observable<any> {
        return this.http.post(serviceUrl, pData);
    }

    update(pId, pData): Observable<any> {
        return this.http.put(`${serviceUrl}/${pId}`, pData);
    }

    updateOnly(pId, pData): Observable<any> {
        return this.http.put(serviceUrl, pData);
    }

    delete(pId): Observable<any> {
        return this.http.delete(`${serviceUrl}/${pId}`);
    }
}
