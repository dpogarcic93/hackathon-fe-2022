import { EChartsOption } from 'echarts';
import * as moment from 'moment';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SocketService } from '../../socket.service';
import { fakeData } from '../../data/fakeData';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit, OnInit {
  data: any[] = [];
  measurements: any[] = [];
  options: EChartsOption = {};
  echartsInstance: any;
  initialDataLoaded = false;
  startLength = 400;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // this.socketService.getMessage().subscribe((measure: any) => {
    //   this.measurements.push(measure);
    // });

    setInterval(() => {
      const newMeasure = fakeData.filter(
        (el) => !this.measurements.includes(el)
      )[0];

      if (newMeasure) {
        this.measurements.push(newMeasure);
      }
    }, 10);
  }

  onChartInit(instance: any) {
    this.echartsInstance = instance;
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      if (
        this.measurements.length >= this.startLength &&
        this.data.length === 0 &&
        !this.initialDataLoaded
      ) {
        this.initialDataLoaded = true;

        for (var i = 0; i < this.startLength; i++) {
          const newMeasure = this.measurements[i];
          this.data.push(newMeasure);
          const index = this.measurements.findIndex(
            (el) =>
              el.timestamp === newMeasure.timestamp &&
              el.value === newMeasure.value
          );
          this.measurements[index].shown = true;
        }

        const measurements = this.data.map((x) => {
          return [this.formatDate(x.timestamp), x.value];
        });

        this.options = {
          title: {
            text: 'Dynamic Data',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false,
            },
          },
          grid: { containLabel: true },
          xAxis: {
            type: 'time',

            splitLine: {
              show: false,
            },
            axisLabel: {
              formatter: (value: any) =>
                moment(value).format('YYYY-MM-DD HH:mm'),
            },
          },
          yAxis: {
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              name: 'Value:',
              type: 'line',
              showSymbol: false,
              data: measurements,
            },
          ],
        };
      }
    }, 1000);

    setInterval(() => {
      if (
        this.measurements.length > this.startLength &&
        this.data.length >= this.startLength
      ) {
        const newMeasure = this.measurements.filter(
          (el) => !this.data.includes(el) && !el.shown
        )[0];

        if (newMeasure) {
          this.data.shift();
          this.data.push(newMeasure);

          const index = this.measurements.findIndex(
            (el) =>
              el.timestamp === newMeasure.timestamp &&
              el.value === newMeasure.value
          );
          this.measurements[index].shown = true;

          const measurements = this.data.map((x) => {
            return [this.formatDate(x.timestamp), x.value];
          });

          this.echartsInstance.setOption({
            series: [
              {
                data: measurements,
              },
            ],
          });
        }
      }
    }, 1000);
  }

  formatDate(value: string) {
    const dateParts = value.split(',');
    const date = dateParts[0];
    const timeParts = dateParts[1].split(' ');
    const time = timeParts[1];
    return moment(`${date} ${time}`).format('YYYY-MM-DD HH:mm:ss');
  }
}
