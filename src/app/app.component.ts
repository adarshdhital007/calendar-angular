import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

interface CalendarCell {
  day: number;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
  event?: { title: string; description: string };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calendar-angular';
  selectedMonth: Date = new Date();
  selectedMonthIndex: number = new Date().getMonth();
  selectedEvent: { title: string; description: string } | null = null;

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  previousMonthDays: number = 0;

  events: { date: string; title: string; description: string }[] = [
    {
      date: '2023-10-13',
      title: 'Taylor Swift Movie',
      description:
        'The movie was recently released depicting and showing the ERAS tour',
    },
    {
      date: '2023-10-14',
      title: 'Logan vs Dillon',
      description:
        'This is the latest boxing fight where two legends are facing each other.',
    },
    { date: '2023-11-29', title: 'ETE 1', description: 'Penetration Testing' },
    {
      date: '2023-12-01',
      title: 'ETE 2',
      description: 'Securing Computing Systems',
    },
  ];
  selectedEventMain: { title: string; description: string } | null = null;
  eventDetailsVisible = false;

  openEventDetails(event: { title: string; description: string }) {
    this.selectedEventMain = event;
    this.eventDetailsVisible = true;
  }

  getEventsForDay(day: number): { title: string; description: string }[] {
    const dateKey = this.getDateKey(day);
    return this.events.filter((event) => event.date === dateKey);
  }

  getDateKey(day: number): string {
    const year = this.selectedMonth.getFullYear();
    const month = this.selectedMonth.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  }

  onMonthChange() {
    this.selectedMonth = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonthIndex,
      1
    );
  }

  get calendar(): CalendarCell[][] {
    const year = this.selectedMonth.getFullYear();
    const month = this.selectedMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar: CalendarCell[][] = [];
    let currentWeek: CalendarCell[] = [];

    this.previousMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--) {
      currentWeek.push({
        day: this.previousMonthDays - i + 1,
        isPreviousMonth: true,
        isNextMonth: false,
        event: undefined,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const event = this.events.find(
        (event) => event.date === this.getDateKey(day)
      );
      currentWeek.push({
        day,
        isPreviousMonth: false,
        isNextMonth: false,
        event,
      });
      if (currentWeek.length === 7) {
        calendar.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      let nextMonthDay = 1;
      while (currentWeek.length < 7) {
        currentWeek.push({
          day: nextMonthDay,
          isPreviousMonth: false,
          isNextMonth: true,
          event: undefined,
        });
        nextMonthDay++;
      }
      calendar.push(currentWeek);
    }

    return calendar;
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.selectedMonth.getMonth() === today.getMonth() &&
      this.selectedMonth.getFullYear() === today.getFullYear()
    );
  }

  isDateInCurrentMonth(
    day: number,
    isPreviousMonth: boolean,
    isNextMonth: boolean
  ): boolean {
    if (isPreviousMonth || isNextMonth) {
      return false;
    }

    const selectedYear = this.selectedMonth.getFullYear();
    const selectedMonth = this.selectedMonth.getMonth();

    return (
      new Date(selectedYear, selectedMonth, day).getMonth() === selectedMonth
    );
  }
}