import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ required: false }) icon!: string;
  @Input({ required: false }) title!: string;
  @Input() type: 'primary' | 'secondary' | 'icon' = 'primary';
  @Input() onClick!: Function;

  onClickButton() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
