import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";




const baseUrl = 'http://localhost:8080/api/subscribers';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  // constructor() { }
  constructor(private http: HttpClient){}


  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(nombre): Observable<any> {
    return this.http.get(`${baseUrl}?nombre=${nombre}`);
  }
}


