import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMeasurement } from 'app/shared/model/measurement.model';

type EntityResponseType = HttpResponse<IMeasurement>;
type EntityArrayResponseType = HttpResponse<IMeasurement[]>;

@Injectable({ providedIn: 'root' })
export class MeasurementService {
  public resourceUrl = SERVER_API_URL + 'api/measurements';

  constructor(protected http: HttpClient) {}

  create(measurement: IMeasurement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(measurement);
    return this.http
      .post<IMeasurement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(measurement: IMeasurement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(measurement);
    return this.http
      .put<IMeasurement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMeasurement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMeasurement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(measurement: IMeasurement): IMeasurement {
    const copy: IMeasurement = Object.assign({}, measurement, {
      dateCreated: measurement.dateCreated && measurement.dateCreated.isValid() ? measurement.dateCreated.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreated = res.body.dateCreated ? moment(res.body.dateCreated) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((measurement: IMeasurement) => {
        measurement.dateCreated = measurement.dateCreated ? moment(measurement.dateCreated) : undefined;
      });
    }
    return res;
  }
}
