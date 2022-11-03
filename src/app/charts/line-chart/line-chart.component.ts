import { EChartsOption } from 'echarts';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {
  measurements: any[][] = [];
  data = [
    ['2000-06-05', 115],
    ['2000-06-06', 129],
    ['2000-06-07', 135],
    ['2000-06-08', 86],
    ['2000-06-09', 73],
    ['2000-06-10', 85],
    ['2000-06-11', 73],
    ['2000-06-12', 68],
    ['2000-06-13', 92],
    ['2000-06-14', 130],
    ['2000-06-15', 245],
    ['2000-06-16', 139],
    ['2000-06-17', 115],
    ['2000-06-18', 111],
    ['2000-06-19', 309],
    ['2000-06-20', 206],
    ['2000-06-21', 137],
    ['2000-06-22', 128],
    ['2000-06-23', 85],
    ['2000-06-24', 94],
    ['2000-06-25', 71],
    ['2000-06-26', 106],
    ['2000-06-27', 84],
    ['2000-06-28', 93],
    ['2000-06-29', 85],
    ['2000-06-30', 73],
    ['2000-07-01', 83],
    ['2000-07-02', 125],
    ['2000-07-03', 107],
    ['2000-07-04', 82],
    ['2000-07-05', 44],
    ['2000-07-06', 72],
    ['2000-07-07', 106],
    ['2000-07-08', 107],
    ['2000-07-09', 66],
    ['2000-07-10', 91],
    ['2000-07-11', 92],
    ['2000-07-12', 113],
    ['2000-07-13', 107],
    ['2000-07-14', 131],
    ['2000-07-15', 111],
    ['2000-07-16', 64],
    ['2000-07-17', 69],
    ['2000-07-18', 88],
    ['2000-07-19', 77],
    ['2000-07-20', 83],
    ['2000-07-21', 111],
    ['2000-07-22', 57],
    ['2000-07-23', 55],
    ['2000-07-24', 60],
  ];
  options: EChartsOption = {};
  echartsInstance: any;

  onChartInit(instance: any) {
    this.echartsInstance = instance;
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      const measurement = this.data.filter(
        (elem) => !this.measurements.find((x) => x === elem)
      )[0];

      if (measurement?.length > 0) {
        this.measurements.push(measurement);
        this.setChartData();
      }
    }, 1000);
  }

  private setChartData() {
    const dateList = this.measurements.map(function (item) {
      return item[0];
    });
    const valueList = this.measurements.map(function (item) {
      return item[1];
    });
    const options: EChartsOption = {
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 400,
        },
        {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: dateList.length - 1,
        },
      ],

      title: [
        {
          left: 'center',
          text: 'Gradient along the y axis',
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [
        {
          data: dateList,
          gridIndex: 0,
        },
      ],
      yAxis: [
        {
          gridIndex: 0,
        },
      ],
      grid: [
        {
          bottom: '60%',
        },
        {
          top: '60%',
        },
      ],
      series: [
        {
          type: 'line',
          showSymbol: false,
          data: valueList,
        },
      ],
    };

    this.echartsInstance.setOption(options);
  }
}
