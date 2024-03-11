import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { v4 as uuidv4 } from 'uuid';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isNew!: boolean;

  taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(
    private readonly modalService: ModalService,
    private readonly formBuilder: FormBuilder
  ) {}

  onClickSave() {
    const { title, description } = this.taskForm.getRawValue();

    this.modalService.saveTask({
      id: uuidv4(),
      title: title || '',
      description: description || '',
    });
  }

  onClickCancel() {
    this.modalService.close();
  }
}
