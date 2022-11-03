import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LineChartComponent } from './line-chart.component';

@NgModule({
  imports: [BrowserModule, NgxEchartsModule.forChild()],
  declarations: [LineChartComponent],
  exports: [LineChartComponent],
})
export class LineChartModule {}
