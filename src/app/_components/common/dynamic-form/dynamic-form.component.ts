import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from 'src/app/models';
import { QuestionControlService, QuestionService } from 'src/app/services';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
/**
 * Creates an instance of dynamic form component.
 * @param qcs 
 * @param service 
 */
constructor(private qcs: QuestionControlService,private service: QuestionService) { }
/**
 * on init
 */
ngOnInit() {
    this.service.quest$.subscribe((formData) => {
      this.form = this.qcs.toFormGroup(formData);

    })
  }
/**
 * Determines whether submit on
 */
onSubmit() {
    this.payLoad = this.form.value;
  }

}
