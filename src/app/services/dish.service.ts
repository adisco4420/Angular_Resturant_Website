import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return new Promise(resolve => {
      //Simulate server letency with 3 second delay
      setTimeout(() => resolve(DISHES), 3000)
    });
  }
  
  getDish(id: number): Promise<Dish> {
    return new Promise(resolve => {
      //Simulate server letency with 3 second delay
      setTimeout(() =>resolve(DISHES.filter((dish) => (dish.id === id))[0]), 3000)
  })
 }

 getFeaturedDish(): Promise<Dish> {
  return  new Promise(resolve => {
    //Simulate server letency with 3 second delay
    setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]),3000);
})
}

}