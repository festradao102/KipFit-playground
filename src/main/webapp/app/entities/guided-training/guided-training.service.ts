import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGuidedTraining } from 'app/shared/model/guided-training.model';

type EntityResponseType = HttpResponse<IGuidedTraining>;
type EntityArrayResponseType = HttpResponse<IGuidedTraining[]>;

@Injectable({ providedIn: 'root' })
export class GuidedTrainingService {
  public resourceUrl = SERVER_API_URL + 'api/guided-trainings';

  constructor(protected http: HttpClient) {}

  create(guidedTraining: IGuidedTraining): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(guidedTraining);
    return this.http
      .post<IGuidedTraining>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(guidedTraining: IGuidedTraining): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(guidedTraining);
    return this.http
      .put<IGuidedTraining>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGuidedTraining>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGuidedTraining[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(guidedTraining: IGuidedTraining): IGuidedTraining {
    const copy: IGuidedTraining = Object.assign({}, guidedTraining, {
      date: guidedTraining.date && guidedTraining.date.isValid() ? guidedTraining.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((guidedTraining: IGuidedTraining) => {
        guidedTraining.date = guidedTraining.date ? moment(guidedTraining.date) : undefined;
      });
    }
    return res;
  }
}
