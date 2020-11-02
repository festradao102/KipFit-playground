import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRoutine } from 'app/shared/model/routine.model';

type EntityResponseType = HttpResponse<IRoutine>;
type EntityArrayResponseType = HttpResponse<IRoutine[]>;

@Injectable({ providedIn: 'root' })
export class RoutineService {
  public resourceUrl = SERVER_API_URL + 'api/routines';

  constructor(protected http: HttpClient) {}

  create(routine: IRoutine): Observable<EntityResponseType> {
    return this.http.post<IRoutine>(this.resourceUrl, routine, { observe: 'response' });
  }

  update(routine: IRoutine): Observable<EntityResponseType> {
    return this.http.put<IRoutine>(this.resourceUrl, routine, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRoutine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRoutine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
