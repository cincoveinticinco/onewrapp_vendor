import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() accept: string = '';
  @Input() cancel: string = '';

  @Output() onAccept = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  handlerAccept(){
    this.onAccept.emit()
  }
  handlerCancel(){
    this.onCancel.emit()
  }

}
