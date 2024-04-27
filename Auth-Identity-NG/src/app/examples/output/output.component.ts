import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent {
  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string){
    this.newItemEvent.emit(value);
  }
}
