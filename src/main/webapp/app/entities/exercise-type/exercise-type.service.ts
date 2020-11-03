import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExerciseType } from 'app/shared/model/exercise-type.model';

type EntityResponseType = HttpResponse<IExerciseType>;
type EntityArrayResponseType = HttpResponse<IExerciseType[]>;

@Injectable({ providedIn: 'root' })
export class ExerciseTypeService {
  public resourceUrl = SERVER_API_URL + 'api/exercise-types';

  constructor(protected http: HttpClient) {}

  create(exerciseType: IExerciseType): Observable<EntityResponseType> {
    return this.http.post<IExerciseType>(this.resourceUrl, exerciseType, { observe: 'response' });
  }

  update(exerciseType: IExerciseType): Observable<EntityResponseType> {
    return this.http.put<IExerciseType>(this.resourceUrl, exerciseType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExerciseType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExerciseType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
