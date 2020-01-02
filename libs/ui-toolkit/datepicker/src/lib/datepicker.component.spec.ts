import { DatepickerModule } from './datepicker.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { utc } from 'moment';

import { DatepickerComponent } from './datepicker.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let de: DebugElement;
  const getText = (dEl: DebugElement): string => dEl.nativeElement.textContent.trim();
  const today = utc();

  const beforeEachFn = () => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DatepickerModule ]
    })
    .compileComponents();
  }));

  describe('start properties specs', () => {

    beforeEach(beforeEachFn);

    it('should start with today active and selected by default', () => {
      fixture.detectChanges();

      const activeDay = de.query(By.css('.mat-calendar-body-active'));
      const selectedDay = de.query(By.css('.mat-calendar-body-selected'));
      const periodButton = de.query(By.css('.mat-calendar-period-button'));

      expect(getText(periodButton)).toBe(today.format('MMM YYYY').toUpperCase());
      expect(getText(activeDay)).toBe(getText(selectedDay));
      expect(getText(activeDay)).toBe(today.date().toString());
    });

    it('should start with 2019-09-09 active if startAt prop is "2019-09-09"', () => {
      component.startAt = utc('2019-09-09');
      fixture.detectChanges();

      const activeDay = de.query(By.css('.mat-calendar-body-active'));
      const periodButton = de.query(By.css('.mat-calendar-period-button'));

      expect(getText(periodButton)).toBe('SEP 2019');
      expect(getText(activeDay)).toBe(component.startAt.date().toString());
    });

    it('should start at month view by default', () => {
      fixture.detectChanges();

      const monthView = de.query(By.css('mat-month-view'));

      expect(monthView).not.toBeNull();
    });

    it('should start at multi-year view if startMonth is "multi-year"', () => {
      component.startView = 'multi-year';
      fixture.detectChanges();

      const multiYearView = de.query(By.css('mat-multi-year-view'));

      expect(multiYearView).not.toBeNull();
    });

    it('should start at year view if startMonth is "year"', () => {
      component.startView = 'year';
      fixture.detectChanges();

      const yearView = de.query(By.css('mat-year-view'));

      expect(yearView).not.toBeNull();
    });
  });

  describe('interactions specs', () => {

    beforeEach(beforeEachFn);

    beforeEach(() => {
      component.startAt = utc('2019-09-09');
      fixture.detectChanges();
    });

    it('should select yesterday if clicked on it', () => {
      const todayCell = de.query(By.css('.mat-calendar-body-active'));
      todayCell.nativeElement.previousElementSibling.click();

      fixture.detectChanges();

      const selectedDay = de.query(By.css('.mat-calendar-body-selected'));
      expect(getText(selectedDay)).toBe((component.startAt.date() - 1).toString());
    });

    it('should change to year view when some year is selected in multi-year view', () => {
      const periodButton = de.query(By.css('.mat-calendar-period-button'));
      periodButton.nativeElement.click();
      fixture.detectChanges();

      const activeCell = de.query(By.css('.mat-calendar-body-active'));
      activeCell.nativeElement.previousElementSibling.click();
      fixture.detectChanges();

      const yearView = de.query(By.css('mat-year-view'));

      expect(yearView).not.toBeNull();
    });

    it('should change to month view when some month is selected in year view', () => {
      const periodButton = de.query(By.css('.mat-calendar-period-button'));
      periodButton.nativeElement.click();
      fixture.detectChanges();

      let activeCell = de.query(By.css('.mat-calendar-body-active'));
      activeCell.nativeElement.previousElementSibling.click();
      fixture.detectChanges();

      periodButton.nativeElement.click();
      fixture.detectChanges();

      activeCell = de.query(By.css('.mat-calendar-body-active'));
      activeCell.nativeElement.nextElementSibling.click();
      fixture.detectChanges();

      const monthView = de.query(By.css('mat-month-view'));

      expect(monthView).not.toBeNull();
    });
  });

  describe('range lock specs', () => {

    beforeEach(beforeEachFn);

    it('should not allow selection of future days by default', () => {
      fixture.detectChanges();

      const todayCell = de.query(By.css('.mat-calendar-body-active'));
      const tommorrowCell = todayCell.nativeElement.nextElementSibling;

      expect(tommorrowCell).not.toBeNull();
    });

    it('should not allow selection before last week if minDate is set to', () => {
      component.startAt = today.endOf('month');
      component.minDate = component.startAt.startOf('week');
      component.maxDate = component.startAt;
      fixture.detectChanges();

      const firstMonthDay = de.query(By.css('.mat-calendar-body-cell'));
      const isDisabled = firstMonthDay.classes['mat-calendar-body-disabled'];

      expect(isDisabled).toBeTruthy();
    });

    it('should not allow selection in next week if maxDate is set to', () => {
      component.startAt = today.startOf('month');
      component.minDate = component.startAt;
      component.maxDate = component.startAt.endOf('week');
      fixture.detectChanges();

      const firstMonthDay = de.query(By.css('tr:last-child .mat-calendar-body-cell:last-child'));
      const isDisabled = firstMonthDay.classes['mat-calendar-body-disabled'];

      expect(isDisabled).toBeTruthy();
    });
  });
});
