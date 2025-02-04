import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { GuidedTrainingService } from 'app/entities/guided-training/guided-training.service';
import { IGuidedTraining, GuidedTraining } from 'app/shared/model/guided-training.model';

describe('Service Tests', () => {
  describe('GuidedTraining Service', () => {
    let injector: TestBed;
    let service: GuidedTrainingService;
    let httpMock: HttpTestingController;
    let elemDefault: IGuidedTraining;
    let expectedResult: IGuidedTraining | IGuidedTraining[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(GuidedTrainingService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new GuidedTraining(0, 'AAAAAAA', 'AAAAAAA', 0, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a GuidedTraining', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.create(new GuidedTraining()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a GuidedTraining', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            trainerName: 'BBBBBB',
            capacity: 1,
            date: currentDate.format(DATE_TIME_FORMAT),
            activeState: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of GuidedTraining', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            trainerName: 'BBBBBB',
            capacity: 1,
            date: currentDate.format(DATE_TIME_FORMAT),
            activeState: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a GuidedTraining', () => {
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
