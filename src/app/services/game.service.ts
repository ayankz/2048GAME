import { Injectable } from '@angular/core';
import {Item} from "../components/game/models/item";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  items: Item[] = [
    {
      value: 2,
      row: 1,
      col: 1
    },
    {
      value: 4,
      row: 4,
      col: 3
    },
    {
      value: 8,
      row: 4,
      col: 2
    },
    {
      value: 16,
      row: 1,
      col: 4
    },
    {
      value: 32,
      row: 2,
      col: 1
    },
    {
      value: 64,
      row: 2,
      col: 3
    },
    {
      value: 128,
      row: 2,
      col: 4
    }

  ]
  constructor() { }
  left(){}
  up(){}
  right(){
    this.items=[]
  }
  down(){}
}
