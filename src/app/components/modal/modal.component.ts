import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isNew!: boolean;

  constructor(private readonly modalService: ModalService) {}

  onClickSave() {
    Math.random();

    this.modalService.saveTask({
      id: uuidv4(),
      title: 'teste',
      description: 'teste2',
    });
  }

  onClickCancel() {
    this.modalService.close();
  }
}
