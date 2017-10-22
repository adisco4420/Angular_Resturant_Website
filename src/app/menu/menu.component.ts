import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';

const DISHES:Dish[] = [
                    {
                      name:'uthappizza',
                      image:'/assets/images/uthappizza.png',
                      catergory:'mains',
                      label:'Hot',
                      price:'4.99',
                      description:'A unique combination of sweet food'

                    },
                    {
                      name:'Zucchipakoda',
                      image:'/assets/images/zucchipakoda.png',
                      catergory:'appetizer',
                      label:'',
                      price:'1.99',
                      description:'Deep friend Zucchapozada'

                    },
                    {
                      name:'Vadonut',
                      image:'/assets/images/vadonut.png',
                      catergory:'appetizer',
                      label:'New',
                      price:'1.99',
                      description:'A quintessential ConfFusion of the food is delicious'

                    },
                    {
                      name:'ElaiCheese Cake',
                      image:'/assets/images/elaicheesecake.png',
                      catergory:'desert',
                      label:'',
                      price:'2.99',
                      description:'A delecttable semi-sweet food taste very delicious'

                    }
                  ];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes:Dish[] = DISHES;

  selectedDish: Dish = DISHES[0]

  constructor() { }

  ngOnInit() {
  }

}
