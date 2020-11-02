import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { FitUserService } from 'app/entities/fit-user/fit-user.service';
import { IFitUser, FitUser } from 'app/shared/model/fit-user.model';

describe('Service Tests', () => {
  describe('FitUser Service', () => {
    let injector: TestBed;
    let service: FitUserService;
    let httpMock: HttpTestingController;
    let elemDefault: IFitUser;
    let expectedResult: IFitUser | IFitUser[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(FitUserService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new FitUser(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            bday: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a FitUser', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            bday: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bday: currentDate,
          },
          returnedFromService
        );

        service.create(new FitUser()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a FitUser', () => {
        const returnedFromService = Object.assign(
          {
            legalId: 'BBBBBB',
            bday: currentDate.format(DATE_TIME_FORMAT),
            phone: 'BBBBBB',
            emergencyPhone: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bday: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of FitUser', () => {
        const returnedFromService = Object.assign(
          {
            legalId: 'BBBBBB',
            bday: currentDate.format(DATE_TIME_FORMAT),
            phone: 'BBBBBB',
            emergencyPhone: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            bday: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a FitUser', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
