import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LineChartModule } from './charts/line-chart/line-chart.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    LineChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
