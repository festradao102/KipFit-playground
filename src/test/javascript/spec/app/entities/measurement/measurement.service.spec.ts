import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MeasurementService } from 'app/entities/measurement/measurement.service';
import { IMeasurement, Measurement } from 'app/shared/model/measurement.model';

describe('Service Tests', () => {
  describe('Measurement Service', () => {
    let injector: TestBed;
    let service: MeasurementService;
    let httpMock: HttpTestingController;
    let elemDefault: IMeasurement;
    let expectedResult: IMeasurement | IMeasurement[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MeasurementService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Measurement(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, currentDate);
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

      it('should create a Measurement', () => {
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

        service.create(new Measurement()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Measurement', () => {
        const returnedFromService = Object.assign(
          {
            measurementId: 1,
            metabolicage: 1,
            bmr: 1,
            boneMass: 1,
            height: 1,
            weight: 1,
            fatPercentage: 1,
            neck: 1,
            rightArm: 1,
            leftArm: 1,
            wrist: 1,
            core: 1,
            hip: 1,
            thorax: 1,
            rightThigh: 1,
            leftThigh: 1,
            rightCalve: 1,
            leftCalve: 1,
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

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Measurement', () => {
        const returnedFromService = Object.assign(
          {
            measurementId: 1,
            metabolicage: 1,
            bmr: 1,
            boneMass: 1,
            height: 1,
            weight: 1,
            fatPercentage: 1,
            neck: 1,
            rightArm: 1,
            leftArm: 1,
            wrist: 1,
            core: 1,
            hip: 1,
            thorax: 1,
            rightThigh: 1,
            leftThigh: 1,
            rightCalve: 1,
            leftCalve: 1,
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

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Measurement', () => {
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
