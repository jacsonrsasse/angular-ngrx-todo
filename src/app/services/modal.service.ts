import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalComponent } from '../components/modal/modal.component';
import { Task } from '../ngrx/states/task-list.state';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef?: OverlayRef;
  private modalPortal!: ComponentPortal<ModalComponent>;
  private _task$ = new Subject<Task>();

  constructor(private overlayService: Overlay) {}

  openModalNewTask() {
    this.generatePortal();

    this.modalPortal.component.prototype.isNew = true;

    this.openModal();
  }

  openModalEditTask() {}

  saveTask(taskInfo: Task) {
    this._task$.next(taskInfo);
    this.close();
  }

  close() {
    if (!this.overlayRef) return;

    this.overlayRef.detach();
    this.overlayRef = undefined;
  }

  get task$() {
    return this._task$.asObservable();
  }

  private generatePortal() {
    this.modalPortal = new ComponentPortal(ModalComponent);
  }

  private openModal() {
    const config = new OverlayConfig({
      positionStrategy: this.overlayService
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      width: '60%',
      hasBackdrop: true,
    });

    this.overlayRef = this.overlayService.create(config);

    this.overlayRef.attach(this.modalPortal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }
}
