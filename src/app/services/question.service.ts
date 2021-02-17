import { Injectable } from '@angular/core';

import {
  QuestionBase,
  DropdownQuestion,
  TextboxQuestion,
  TextareaQuestion,
  RadioQuestion
} from 'src/app/models';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { ButtonQuestion } from '@app/models/question-button';

@Injectable()
export class QuestionService {
  // dummy data
  questions: QuestionBase<any>[] = [
    new DropdownQuestion({
      key: 'club',
      label: 'Favorit Club',
      options: [
        { key: 'Ahly', value: 'Ahly' },
        { key: 'bayern munich', value: 'bayern munich' },
        { key: 'tiger', value: 'tiger' },
        { key: 'palmeiras', value: 'palmeiras' }
      ],
      placeholder: 'Select one option',
      order: 4
    }),

    new TextboxQuestion({
      key: 'firstName',
      label: 'First name',
      value: 'Ahmed',
      required: true,
      order: 1
    }),

    new TextboxQuestion({
      key: 'lastName',
      label: 'Last Name',
      value: 'Nader',
      order: 2
    }),

    new RadioQuestion({
      key: 'gender',
      label: 'Gender',
      type: 'radio',
      options: [
        {key: 'Male',  value: 'm'},
        {key: 'Female',  value: 'f'}
      ],
      required: false,
      order: 6
    }),

    new TextboxQuestion({
      key: 'emailAddress',
      label: 'Email',
      type: 'email',
      order: 3
    }),

    new TextareaQuestion({
      key: 'message',
      label: 'Message',
      cols: 30,
      rows: 10,
      placeholder: 'Your message here...',
      order: 5
    }),
    new ButtonQuestion({
      type: 'submit',
      text: 'test',
      order: 7
    })
  ];
/*
 create dynamicJson BehaviorSubject : QuestionBase data type of any 
 and pass inital value from the dummy data array with sorted based on order 
*/
  private dynamicJson = new BehaviorSubject<QuestionBase<any>[]>([...this.questions.sort((a, b) => a.order - b.order)]);
 
  /**
   * 
   */
  quest$: Observable<QuestionBase<any>[]> = this.dynamicJson.asObservable();
/**
 * TODO: Update the BehaviorSubject with any chenge come from the template  
 * Gets questions
 * @param quest 
 */
getQuestions(quest: QuestionBase<any>[]) {
    this.dynamicJson.next(quest.sort((a, b) => a.order - b.order));
  }
}
