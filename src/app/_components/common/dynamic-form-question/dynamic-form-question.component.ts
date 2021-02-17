import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';

import { QuestionBase } from 'src/app/models';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }
/**
 * Determines whether form array as
 * @param ctrl 
 * @returns form array 
 */
private asFormArray(ctrl: AbstractControl): FormArray {
    return ctrl as FormArray;
  }
/**
 * Adds question
 * @returns void
 */
public addQuestion(): void {
    this.questionArray.push(this.fb.control(''));
  }
/**
 *
 * @param index 
 */
  public removeQuestion(index: number): void {
    this.questionArray.removeAt(index);
  }
/**
 * Gets question array
 * @returns form array 
 */
public get questionArray(): FormArray {
    return this.form.get(this.question.key) as FormArray;
  }
/**
 * Gets question is iterable
 */
public get questionIsIterable(): boolean {
    return !!this.question && this.question.iterable;
  }
  /**
   * Questions control
   * @param [index] 
   * @returns control 
   */
  public questionControl(index?: number): AbstractControl {
    return this.questionIsIterable ? this.asFormArray(this.form.get(this.question.key)).controls[index] : this.form.get(this.question.key);
  }

  /**
   * Questions id
   * @param [index] 
   * @returns id 
   */
  public questionId(index?: number): string {
    return this.questionIsIterable ? `${this.question.key}-${index}` : this.question.key;
  }

  /**
   * Questions label
   * @param [index] 
   * @returns label 
   */
  public questionLabel(index?: number): string {
    return this.questionIsIterable ? `${this.question.label} n°${index + 1}` : this.question.label;
  }
}
