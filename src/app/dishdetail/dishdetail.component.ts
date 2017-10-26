import { Component, OnInit, } from '@angular/core';

import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { dishFeedback } from '../shared/feedback';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
 
  dish: Dish;
  dishIds:number[];
  prev:number;
  next:number;
  d:any;
  n:any;
  com:any;
  value:any;
  comments:any;


  array:any;
  feedbackForm:FormGroup;
  feedback:dishFeedback;
  formErrors = {
    'authorname':'',
    'message':'',
    'rating':'',
  }

  validationMessages = {
    'authorname':{
      'required' :'authorname is required.',
      'minlength':'authorname must be at least 2 characers long',
      'maxlength':'authorname must not be more than 20 charcter long',
      'pattern':'authorname must contain only Alphabet',
    },
    'message':{
      'required' :'comment is required.',
      'minlength':'comment must be at least 2 characers long',
    },
   
  }
 


  constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fb : FormBuilder) { 
          this.createForm();
        }

        ngOnInit() {
          
              this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
              this.route.params
                .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
                .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
            }
            setPrevNext(dishId: number) {
              let index = this.dishIds.indexOf(dishId);
              this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
              this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
            }
      
        goBack(): void {
          this.location.back();
        }
        createForm(){
          this.feedbackForm = this.fb.group({
            authorname:['', [Validators.required,Validators.pattern, Validators.minLength(2), Validators.maxLength(25)]],
            message:['', [Validators.required,Validators.minLength(2),] ],
            rating:[5]
          })
          this.feedbackForm.valueChanges
          .subscribe(data => this.onValueChanged(data));
          
          this.onValueChanged() // reset form validation messages
          

}
_listFilter:string;
get listFilter():string {
    return this._listFilter;
}
set listFilter(value:string) {
  this._listFilter = value;
}
_listFilter1:string;
get listFilter1():string {
    return this._listFilter1;
}
set listFilter1(value:string) {
  this._listFilter1 = value;
}

onValueChanged(data?: any){
  if(!this.feedbackForm) {return;}
  const form = this.feedbackForm;

  for (const field in this.formErrors) {
    this.formErrors[field]= '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid){
      const messages = this.validationMessages[field];
      for (const key in control.errors){
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}

onSubmit(){
this.feedback = this.feedbackForm.value;
console.log(this.feedback);
this.feedbackForm.reset({
  authorname:'',
  message:'',
});
this.array = [];
this.array.push(this.feedback.message,);
console.log(this.array);
this.com= [];
this.com.push('--  ' + this.feedback.authorname);
this.value = [];
this.value.push(this.feedback.rating + '  Star');
this.d = new Date();
this.n = this.d.toISOString();
this.comments =[ {'message':'sodiq'}];
}



}
