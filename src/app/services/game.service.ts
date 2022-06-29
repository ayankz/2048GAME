import {Injectable} from '@angular/core';
import {Item} from "../components/game/models/item";
import {merge} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private size = 4;
  private freeCells: number[] = []

  private get emptyCells(): number[] {
    const notEmptyCells = this.notEmptyCells
    return this.freeCells.filter(position => !notEmptyCells.includes(position));
  }

  private get notEmptyCells(): number[] {
    return this.items.map(item => item.row * 10 + item.col)
  }

  items: Item[] = []

  constructor() {
    this.generateFreeCells()
    this.generateItems()
  }

  left() {
    this.move('row','col',false)
  }

  up() {
    this.move('col','row',false)

  }

  right() {
    this.move('row','col',true)

  }

  down() {
    this.move('col','row',true)
  }

  private move(
    dimX: 'col' | 'row' = 'row',
    dimY: 'col' | 'row' = 'col',
    reverse = false) {
    this.clearDeletedItems()
    //left
    const mergedItems: Item[] = []
    for (let x = 1; x <= this.size; x++) {
      const rowItems: Item[] = this.items
        .filter(item => item[dimX] === x)
        .sort((a, b) => a[dimY] - b[dimY])
      if (reverse) {
        rowItems.reverse()
      }
      let y = reverse ? this.size : 1;
      let merged = false;
      let prevItem: Item = null;
      for (let i = 0; i < rowItems.length; i++) {
        const item: Item = rowItems[i]
        if (prevItem) {
          if (merged) {
            merged = false;
          } else if (item.value === prevItem.value) {
            reverse ? y++ : y--;
            prevItem.isOnDelete = true;
            item.isOnDelete = true;
            mergedItems.push(({
              value: item.value * 2,
              [dimY]: y,
              [dimX]: x
            } as any))
            merged = true
          }
        }
        item[dimY] = y;
        reverse ? y-- : y++;
        prevItem = item
      }
    }
    this.items = [...this.items, ...mergedItems]
    this.generateItems()


  }

  private clearDeletedItems() {
    this.items = this.items.filter(item => !item.isOnDelete)
  }

  private generateItems(length: number = 2) {
    const positions: number [] = this.emptyCells
      .sort(() => Math.random() - 0.5)
      .slice(0, length);
    this.items = [
      ...this.items,
      ...positions.map<Item>(position => ({
        value: 2,
        col: position % 10,
        row: (position - position % 10) / 10
      }))
    ]
  }

  private generateFreeCells() {
    for (let row = 1; row <= this.size; row++) {
      for (let col = 1; col <= this.size; col++) {
        this.freeCells.push(row * 10 + col)
      }
    }
  }
}

