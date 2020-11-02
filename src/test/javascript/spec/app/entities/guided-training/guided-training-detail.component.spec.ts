import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KipfitTestModule } from '../../../test.module';
import { GuidedTrainingDetailComponent } from 'app/entities/guided-training/guided-training-detail.component';
import { GuidedTraining } from 'app/shared/model/guided-training.model';

describe('Component Tests', () => {
  describe('GuidedTraining Management Detail Component', () => {
    let comp: GuidedTrainingDetailComponent;
    let fixture: ComponentFixture<GuidedTrainingDetailComponent>;
    const route = ({ data: of({ guidedTraining: new GuidedTraining(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KipfitTestModule],
        declarations: [GuidedTrainingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GuidedTrainingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GuidedTrainingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load guidedTraining on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.guidedTraining).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
