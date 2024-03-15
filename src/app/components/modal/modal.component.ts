import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { AppService } from '../../services/app.service';
import { Task } from '../../ngrx/states/task.state';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @Input() isNew!: boolean;
  @Input({ required: false }) task!: Task | undefined;

  taskForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(
    private readonly appService: AppService,
    private readonly modalService: ModalService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.task) {
      const { title, description } = this.task;
      this.taskForm.setValue({ title, description: description || '' });
    }
  }

  onClickSave() {
    const { title, description } = this.taskForm.getRawValue();

    const id = !this.isNew && this.task ? this.task.id : uuidv4();

    const task = {
      id,
      title: title || '',
      description: description || '',
    };
    this.isNew
      ? this.appService.saveTask(task)
      : this.appService.editTask(task);

    this.modalService.close();
  }

  onClickCancel() {
    this.modalService.close();
  }
}
