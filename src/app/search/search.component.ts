import { Component, OnInit } from '@angular/core';
import { Food } from 'app/app.data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private myFood: Food) { }

  ngOnInit() {
  }

}
