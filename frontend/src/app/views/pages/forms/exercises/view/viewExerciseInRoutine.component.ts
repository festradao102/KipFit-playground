import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExerciseService} from '../../../../../services/exercise.service';
import Swal from 'sweetalert2';
import {ExerciseTypeService} from '../../../../../services/exercise-type.service';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-view-exercise-in-routine-component',
  templateUrl: './viewExerciseInRoutine.component.html',
  styleUrls: ['./viewExerciseInRoutine.component.scss']
})
export class ViewExerciseInRoutineComponent implements OnInit {

  currentExercise = null;
  iframe_html: any;
  videoOptions = {
    query: {portrait: 0, color: '333'},
    attr: {width: 600, height: 475}
  };

  @Input('exerciseId')
  set exerciseId(exerciseId: number) {
    this.getExercise(exerciseId);
  }

  constructor(private exerciseService: ExerciseService,
              private exerciseTypeService: ExerciseTypeService,
              private activatedRoute: ActivatedRoute,
              private embedService: EmbedVideoService) {
  }

  ngOnInit(): void { }

  getExercise(id): void {
    this.exerciseService.get(id)
      .subscribe(
        data => {
          this.currentExercise = data;
          this.iframe_html = this.embedService.embed(this.currentExercise.videoPath, this.videoOptions);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
