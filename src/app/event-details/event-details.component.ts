import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  @Input() event: { title: string, description: string } | null = { title: '', description: '' };
  @Output() close = new EventEmitter<void>();
}
