import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalComponent } from '../components/modal/modal.component';
import { Task } from '../ngrx/states/task.state';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef?: OverlayRef;
  private modalPortal!: ComponentPortal<ModalComponent>;

  constructor(private overlayService: Overlay) {}

  close() {
    if (!this.overlayRef) return;

    this.overlayRef.detach();
    this.overlayRef = undefined;
  }

  private generatePortal() {
    this.modalPortal = new ComponentPortal(ModalComponent);
  }

  openModal(task?: Task) {
    this.generatePortal();

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

    const componentRef = this.overlayRef.attach(this.modalPortal);

    componentRef.instance.isNew = !task;
    componentRef.instance.task = task;

    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }
}
