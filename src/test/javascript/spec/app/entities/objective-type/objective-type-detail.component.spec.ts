import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { ObjectiveTypeDetailComponent } from 'app/entities/objective-type/objective-type-detail.component';
import { ObjectiveType } from 'app/shared/model/objective-type.model';

describe('Component Tests', () => {
  describe('ObjectiveType Management Detail Component', () => {
    let comp: ObjectiveTypeDetailComponent;
    let fixture: ComponentFixture<ObjectiveTypeDetailComponent>;
    const route = ({ data: of({ objectiveType: new ObjectiveType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [ObjectiveTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ObjectiveTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ObjectiveTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load objectiveType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.objectiveType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
