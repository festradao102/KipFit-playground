import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFitUser } from 'app/shared/model/fit-user.model';

type EntityResponseType = HttpResponse<IFitUser>;
type EntityArrayResponseType = HttpResponse<IFitUser[]>;

@Injectable({ providedIn: 'root' })
export class FitUserService {
  public resourceUrl = SERVER_API_URL + 'api/fit-users';

  constructor(protected http: HttpClient) {}

  create(fitUser: IFitUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fitUser);
    return this.http
      .post<IFitUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(fitUser: IFitUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fitUser);
    return this.http
      .put<IFitUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFitUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFitUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(fitUser: IFitUser): IFitUser {
    const copy: IFitUser = Object.assign({}, fitUser, {
      bday: fitUser.bday && fitUser.bday.isValid() ? fitUser.bday.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.bday = res.body.bday ? moment(res.body.bday) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((fitUser: IFitUser) => {
        fitUser.bday = fitUser.bday ? moment(fitUser.bday) : undefined;
      });
    }
    return res;
  }
}
