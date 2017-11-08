import { Component, OnInit, Inject} from '@angular/core';

import {Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';

import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state , style, animate, transition} from '@angular/animations'

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    trigger('visibility',[
      state('shown',style({
        transform:'scale(1.0)',
        opacity:1
      })),
      state('hidden', style({
        transform:'scale(0.5)',
        opacity:0
      })),
      transition('* => *', animate('5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {
 
  dish: Dish;
  dishIds:number[];
  dishcopy = null;
  prev:number;
  next:number;
  errMess:string;
  visibility= 'shown';

  feedbackForm:FormGroup;
  comment:Comment;
  formErrors = {
    'author':'',
    'comment':'',

  }

  validationMessages = {
    'author':{
      'required' :'authorname is required.',
      'minlength':'authorname must be at least 2 characers long',
      'maxlength':'authorname must not be more than 20 charcter long',
      'pattern':'authorname must contain only Alphabet',
    },
    'comment':{
      'required' :'comment is required.',
      'minlength':'comment must be at least 2 characers long',
    },
   
  }
 


  constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private location: Location,
        @Inject('BaseURL') private BaseURL,
        private fb : FormBuilder,) { 
          this.createForm();
        }

        ngOnInit() {
          this.createForm();
              this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
              this.route.params
                .switchMap((params: Params) => {this.visibility= 'hidden';return  this.dishservice.getDish(+params['id']); })
                .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility= 'shown'},
                  errmess => {this.dish= null; this.errMess = <any>errmess });
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
            author:['', [Validators.required,Validators.pattern, Validators.minLength(2), Validators.maxLength(25)]],
            comment:['', [Validators.required,Validators.minLength(2),] ],
            rating:5
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
this.comment = this.feedbackForm.value;
this.comment.date = new Date().toISOString()
console.log(this.comment);

this.dishcopy.comments.push(this.comment)
this.dishcopy.save()
  .subscribe(dish => this.dish = dish);
this.feedbackForm.reset({
  authorname:'',
  message:'',
  rating:5
});

}



}
