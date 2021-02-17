import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { pipe } from 'rxjs';

import { QuestionService } from 'src/app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  questions: any[];
  data: any = {};
/**
  * @param questionService 
 */
constructor(private questionService: QuestionService) {
/* TODO : @get  quest$ subject data from question service 
* pass the data object to questions array 
*/
    questionService.quest$.subscribe((data) => {

      this.questions = data;
    })
    /** 
     *  convert json object to string to can render it as json format in template
    */
    this.data = JSON.stringify(this.questions, undefined, 2);
  }
  /**
   * // TODO: comment updateForm when change in textarea
   * updates forms when the JSON object in the text-area have change
   * Updates form
   * @param event 
   * @returns 
   */
  updateForm(event) {
      // check if the textarea is empty to set textarea value to empty array of object
    if (event.target.value === "") {
      this.data = "[{}]";
      this.questionService.getQuestions(this.data);
    } else {
      /* else will pass new value to the from the textarea
      /* to the questions servic to update the form 
      */
       let jsonObject = JSON.parse(event.target.value)
      this.questionService.getQuestions(jsonObject.sort((a, b) => a.order - b.order));

    }
  }
}
