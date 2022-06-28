import {Component, HostListener, OnInit} from '@angular/core';
import {Item} from "./models/item";
import {GameService} from "../../services/game.service";

const colors: { [k: number]: string } = {
  2: '#73C6B6',
  4: '#76D7C4',
  8: '#AF7AC5',
  16: '#5F6A6A',
  32: '#CD6155',
  64: '#0E6655',
  128: '#F1C40F',
  256: '#7D6608',
  1028: '#B03A2E',
  2048: '#2471A3',
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  keyEvents: { [type: string]: string } =
    {
      ArrowRight: 'right',
      ArrowLeft: 'left',
      ArrowUp: 'up',
      ArrowDown: 'down',

    }


  constructor( public gameService:GameService) {
  }

  ngOnInit(): void {
  }

  getStyles(item: Item): { [p: string]: string } {
    const top = (item.row * 110 - 100) + 'px';
    const left = (item.col * 110 - 100) + 'px';
    return {
      top,
      left,
      'background-color': colors[item.value] || 'black'
    }
  }

  @HostListener('window:keyup', ['$event'])
  getKeyUp(event: KeyboardEvent) {
    if (this.keyEvents[event.code]) {
      this.gameService[this.keyEvents[event.code]]();
      console.log(this.keyEvents[event.code]);
    }

  }
}
