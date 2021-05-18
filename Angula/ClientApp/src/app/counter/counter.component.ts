import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  public data = {
    title: 'Các bạn',
    website: 'freetuts.net'
  }
  public incrementCounter() {
    this.currentCount++;
  }
}
