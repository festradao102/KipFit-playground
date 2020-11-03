import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PlanService } from 'app/entities/plan/plan.service';
import { IPlan, Plan } from 'app/shared/model/plan.model';

describe('Service Tests', () => {
  describe('Plan Service', () => {
    let injector: TestBed;
    let service: PlanService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlan;
    let expectedResult: IPlan | IPlan[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PlanService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Plan(0, 'AAAAAAA', currentDate, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Plan', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
          },
          returnedFromService
        );

        service.create(new Plan()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Plan', () => {
        const returnedFromService = Object.assign(
          {
            objective: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            creatorName: 'BBBBBB',
            active: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Plan', () => {
        const returnedFromService = Object.assign(
          {
            objective: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            creatorName: 'BBBBBB',
            active: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Plan', () => {
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
