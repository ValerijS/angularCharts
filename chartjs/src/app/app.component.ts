import {
    Component,
    OnInit
} from '@angular/core';
import {
    InputDataService
} from './input-data.service';
import {
    ChartsModule
} from 'ng2-charts';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor(private inputDataService: InputDataService) {};
    public title = 'app_chartjs';
    public gettingData: any;
    public pieData;
    public lineData;
    public selectedPCP: string = 'revenues';
    public pieChartParameters: any[] = [
        {
            value: 'revenues',
            viewValue: 'Revenues'
        },
        {
            value: 'margin',
            viewValue: 'Margin'
        },
        {
            value: 'markdown',
            viewValue: 'Markdown'
        }
  ];
    public pieChartType: string = 'pie';
    public pieChartOptions: any = {
        'backgroundColor': [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
            ]
    }

    // events on slice click
    public dropOutCategoryArr: string[];
    public dropOutCategoryArrView: string;
    public chartClicked(e: any): void {
        var numb: number;
        function checkCategory(arr) {
            return arr == this;
        }
        if (e.active.length > 0) {
            numb = this.dropOutCategoryArr.findIndex(checkCategory, e.active[0]._chart.config.data.labels[e.active[0]._index]);
            numb === -1 ? this.dropOutCategoryArr.push(e.active[0]._chart.config.data.labels[e.active[0]._index]) : this.dropOutCategoryArr.splice(numb, 1);
            this.dropOutCategoryArrView = this.dropOutCategoryArr.toString();

            this.lineData = this.inputDataService.servePieAndLineArrays(this.gettingData, this.selectedPCP, this.inputDataService.Week_refs, this.dropOutCategoryArr);

            console.log('var_click_cat', this.dropOutCategoryArr, this.lineData, this.selectedPCP, this.inputDataService.Week_refs);
        }

    }

    // event on pie chart slice hover
    public chartHovered(e: any): void {
        console.log(e);
    }

    public chartType: string = 'line';

    public chartDatasets: any [] ;

    public chartColors: any [] = [
        {
            backgroundColor: 'rgba(105, 0, 132, .2)',
            borderColor: 'rgba(200, 99, 132, .7)',
            borderWidth: 2,
    },
        {
            backgroundColor: 'rgba(0, 137, 132, .2)',
            borderColor: 'rgba(0, 10, 130, .7)',
            borderWidth: 2,
    }
  ];

    public chartOptions: any = {
        responsive: true
    };

    public setParameter() {
        this.inputDataService.PieChartParameter = this.selectedPCP;
        this.resetDefaultsParameters();
    }
    public onClickSubmit(data) {
        var chartData: any[];
        this.inputDataService.Week_refs = data;
        chartData = this.inputDataService.createPieAndLineArrays(this.gettingData, this.selectedPCP, this.inputDataService.Week_refs);
        this.pieData = chartData[0];
        this.lineData = chartData[1];
        console.log('var_click', this.pieData, this.lineData, this.inputDataService.Week_refs);

    };
    public startCharts(): void {
        var chartData: any[];
        this.dropOutCategoryArr = [];
        chartData = this.inputDataService.createPieAndLineArrays(this.gettingData, this.inputDataService.PieChartParameter, this.inputDataService.Week_refs);
        this.pieData = chartData[0];
        this.lineData = chartData[1];
        console.log('var', this.pieData, this.lineData, this.inputDataService.Week_refs);
    };
    public resetDefaultsParameters(): void {
		this.dropOutCategoryArrView = '';
        this.startCharts();
    }

    ngOnInit() {
        this.inputDataService.http.get('assets/data.json').
        subscribe((data) => {
            this.gettingData = data;
            this.startCharts();
        });
    }
}
