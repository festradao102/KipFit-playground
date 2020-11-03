import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExercisesSetType } from 'app/shared/model/exercises-set-type.model';

type EntityResponseType = HttpResponse<IExercisesSetType>;
type EntityArrayResponseType = HttpResponse<IExercisesSetType[]>;

@Injectable({ providedIn: 'root' })
export class ExercisesSetTypeService {
  public resourceUrl = SERVER_API_URL + 'api/exercises-set-types';

  constructor(protected http: HttpClient) {}

  create(exercisesSetType: IExercisesSetType): Observable<EntityResponseType> {
    return this.http.post<IExercisesSetType>(this.resourceUrl, exercisesSetType, { observe: 'response' });
  }

  update(exercisesSetType: IExercisesSetType): Observable<EntityResponseType> {
    return this.http.put<IExercisesSetType>(this.resourceUrl, exercisesSetType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExercisesSetType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExercisesSetType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
