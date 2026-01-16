import { Component, input, model } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-input',
  styleUrl: './ui-input.scss',
  templateUrl: './ui-input.html',
})
export class UiInputComponent {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<'text' | 'email' | 'password' | 'number'>('text');
  disabled = input<boolean>(false);
  value = model<string>('');

  onInput(event: Event) {
    const nextValue = (event.target as HTMLInputElement).value;
    this.value.set(nextValue);
  }
}
