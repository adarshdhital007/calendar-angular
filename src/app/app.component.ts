import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar-angular';
  selectedMonth: Date = new Date();
  selectedMonthIndex: number = new Date().getMonth();
  selectedEvent: { title: string, description: string } | null = null;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  getDateKey(day: number): string {
    const year = this.selectedMonth.getFullYear();
    const month = this.selectedMonth.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  // Rough Events
  events: { [key: string]: { title: string, description: string }[] } = {
    '2023-10-14': [
      { title: 'Logan vs Dillon', description: 'This is the latest boxing fight where two legends are facing each other.' },
    ],
    '2023-10-13': [
      { title: 'Taylor Swift Movie', description: 'The movie was recently released depicting and showing the ERAS tour' },
    ],
    '2023-11-29': [
      { title: 'ETE', description: 'INT 244' },
    ],
    '2023-12-01': [
      { title: 'ETE 2', description: 'INT 245' },
    ],
  };
  onMonthChange() {
    this.selectedMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonthIndex, 1);
  }
  get calendar(): number[][] {
    const year = this.selectedMonth.getFullYear();
    const month = this.selectedMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDay = new Date(year, month, daysInMonth).getDay();

    const calendar: number[][] = [];
    let currentWeek: number[] = [];

    // Add previous month's days
    for (let i = firstDay; i > 0; i--) {
      currentWeek.push(0);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        calendar.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add next month's days to fill the calendar
    for (let i = lastDay; i < 6; i++) {
      currentWeek.push();
    }

    if (currentWeek.length > 0) {
      calendar.push(currentWeek);
    }

    return calendar;
  }

  showEvents(dateKey: string) {
    if (this.events[dateKey]) {
      this.selectedEvent = this.events[dateKey][0];
    }
  }


  closeEventDetails() {
    this.selectedEvent = null;
  }

  changeMonth(monthIndex: number) {
    this.selectedMonth = new Date(this.selectedMonth.getFullYear(), monthIndex, 1);
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.selectedMonth.getMonth() === today.getMonth() &&
      this.selectedMonth.getFullYear() === today.getFullYear()
    );
  }

}
