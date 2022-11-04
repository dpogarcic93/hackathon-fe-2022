import { NgxEchartsModule } from 'ngx-echarts';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LineChartModule } from './charts/line-chart/line-chart.module';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';

const config: SocketIoConfig = {
  url: 'https://sad-bikes-take-80-242-164-154.loca.lt',
  options: {},
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    SocketIoModule.forRoot(config),
    LineChartModule,
  ],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
