import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SubscriberService } from 'app/entities/subscriber/subscriber.service';
import { ISubscriber, Subscriber } from 'app/shared/model/subscriber.model';

describe('Service Tests', () => {
  describe('Subscriber Service', () => {
    let injector: TestBed;
    let service: SubscriberService;
    let httpMock: HttpTestingController;
    let elemDefault: ISubscriber;
    let expectedResult: ISubscriber | ISubscriber[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SubscriberService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Subscriber(0, currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            initialDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Subscriber', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            initialDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            initialDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Subscriber()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Subscriber', () => {
        const returnedFromService = Object.assign(
          {
            initialDate: currentDate.format(DATE_TIME_FORMAT),
            medicalConditions: 'BBBBBB',
            paymentFreq: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            initialDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Subscriber', () => {
        const returnedFromService = Object.assign(
          {
            initialDate: currentDate.format(DATE_TIME_FORMAT),
            medicalConditions: 'BBBBBB',
            paymentFreq: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            initialDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Subscriber', () => {
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
