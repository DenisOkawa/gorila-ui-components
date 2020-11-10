import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER, MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '@gorilainvest/ui-toolkit/button';

import { GorilaDatepickerAdapter } from './adapter/datepicker.adapter';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { DatepickerContentComponent } from './datepicker-content/datepicker-content.component';
import { DatepickerToggleComponent } from './datepicker-toggle/datepicker-toggle.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerModeService } from './service/datepicker-mode.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ButtonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  declarations: [DatepickerComponent, DatepickerContentComponent, DatepickerToggleComponent, CalendarHeaderComponent],
  providers: [
    DatepickerModeService,
    MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: GorilaDatepickerAdapter },
  ],
  exports: [DatepickerComponent, DatepickerContentComponent, DatepickerToggleComponent, CalendarHeaderComponent],
  entryComponents: [CalendarHeaderComponent, DatepickerContentComponent],
})
export class DatepickerModule {}
