import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExercisesSet } from 'app/shared/model/exercises-set.model';

type EntityResponseType = HttpResponse<IExercisesSet>;
type EntityArrayResponseType = HttpResponse<IExercisesSet[]>;

@Injectable({ providedIn: 'root' })
export class ExercisesSetService {
  public resourceUrl = SERVER_API_URL + 'api/exercises-sets';

  constructor(protected http: HttpClient) {}

  create(exercisesSet: IExercisesSet): Observable<EntityResponseType> {
    return this.http.post<IExercisesSet>(this.resourceUrl, exercisesSet, { observe: 'response' });
  }

  update(exercisesSet: IExercisesSet): Observable<EntityResponseType> {
    return this.http.put<IExercisesSet>(this.resourceUrl, exercisesSet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExercisesSet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExercisesSet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
