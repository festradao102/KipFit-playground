import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IObjectiveType } from 'app/shared/model/objective-type.model';

type EntityResponseType = HttpResponse<IObjectiveType>;
type EntityArrayResponseType = HttpResponse<IObjectiveType[]>;

@Injectable({ providedIn: 'root' })
export class ObjectiveTypeService {
  public resourceUrl = SERVER_API_URL + 'api/objective-types';

  constructor(protected http: HttpClient) {}

  create(objectiveType: IObjectiveType): Observable<EntityResponseType> {
    return this.http.post<IObjectiveType>(this.resourceUrl, objectiveType, { observe: 'response' });
  }

  update(objectiveType: IObjectiveType): Observable<EntityResponseType> {
    return this.http.put<IObjectiveType>(this.resourceUrl, objectiveType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IObjectiveType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IObjectiveType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
