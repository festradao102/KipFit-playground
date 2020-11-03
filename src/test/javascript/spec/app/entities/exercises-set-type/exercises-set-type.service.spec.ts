import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExercisesSetTypeService } from 'app/entities/exercises-set-type/exercises-set-type.service';
import { IExercisesSetType, ExercisesSetType } from 'app/shared/model/exercises-set-type.model';
import { ExercisesSetTypeName } from 'app/shared/model/enumerations/exercises-set-type-name.model';

describe('Service Tests', () => {
  describe('ExercisesSetType Service', () => {
    let injector: TestBed;
    let service: ExercisesSetTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: IExercisesSetType;
    let expectedResult: IExercisesSetType | IExercisesSetType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ExercisesSetTypeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ExercisesSetType(0, ExercisesSetTypeName.SUPERIOR);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ExercisesSetType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ExercisesSetType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ExercisesSetType', () => {
        const returnedFromService = Object.assign(
          {
            typeName: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ExercisesSetType', () => {
        const returnedFromService = Object.assign(
          {
            typeName: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ExercisesSetType', () => {
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
