import {
    Injectable
} from '@angular/core';
import {
    Http
} from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class InputDataService {

    constructor(public http: Http) {}

    PieChartParameter: string = 'revenues';
    PieChartParameterSelect: string;
    Week_refs = {
        week_ref_F: 1,
        week_ref_L: 53
    };

    public createPieAndLineArrays(data, param: string, Week_refs: any): any {
        let arrOfObj: any[],
			arrOfObjCopy: any[],
			arr_Y: any[] = ['', 0],
			arr_X: any[] = [],
            arr_Z: any[] = [],
            pieLabelsArray: string[] = [],
            pieValuesArray: number[] = [],
            lineLabelsArray: string[] = [],
            lineValuesArray: number[] = [],
            week_ref_F: number = Week_refs.week_ref_F,
            week_ref_L: number = Week_refs.week_ref_L,
            i: number = 1,
            k: number = 0,
            m: number = 0;

        arrOfObj = JSON.parse(data['_body']);
        arrOfObjCopy = arrOfObj;
        arrOfObj.sort((a, b) => {
            let x = a.category_desc;
            let y = b.category_desc;
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        arr_X = arrOfObj;
        for (i = 1; i < arr_X.length; i = i + 1) {
            if (arr_Y.length === 2) {
                if (Number(arr_X[i - 1].week_ref) <= week_ref_L && Number(arr_X[i - 1].week_ref) >= week_ref_F) {
                    arr_Y.push(arr_X[i - 1].category_desc);
                    Number(arr_X[i - 1][param]) ? arr_Y.push(Number(arr_X[i - 1][param])) : arr_Y.push(0);
                } else {
                    arr_Y.push(arr_X[i - 1].category_desc);
                    arr_Y.push(0);
                }
            } else {
                if (!(arr_X[i - 1].category_desc == arr_X[i].category_desc)) {
                    if (Number(arr_X[i].week_ref) <= week_ref_L && Number(arr_X[i].week_ref) >= week_ref_F) {
                        arr_Y.push(arr_X[i].category_desc);
                        Number(arr_X[i][param]) ? arr_Y.push(Number(arr_X[i][param])) : arr_Y.push(0);
                    } else {
                        arr_Y.push(arr_X[i].category_desc);
                        arr_Y.push(0);
                    }
                } else {
                    if (Number(arr_X[i].week_ref) <= week_ref_L && Number(arr_X[i].week_ref) >= week_ref_F) {
                        Number(arr_X[i][param]) ? arr_Y[arr_Y.length - 1] = arr_Y[arr_Y.length - 1] + Number(arr_X[i][param]) : arr_Y[arr_Y.length - 1] = arr_Y[arr_Y.length - 1] + 0;
                    }
                }
            }
        }
        for (; k < arr_Y.length / 2; k++) {
            pieLabelsArray.push(arr_Y[2 * k]);
            pieValuesArray.push(arr_Y[2 * k + 1]);
        }
        arrOfObjCopy.sort((a, b)=> {
            let x = Number(a.week_ref);
            let y = Number(b.week_ref);
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        arr_X = arrOfObjCopy;
        console.log('kk', arr_X);
        for (i = 1; i < arr_X.length; i = i + 1) {
            if (arr_Z.length === 0) {
                if (Number(arr_X[i - 1].week_ref) <= week_ref_L && Number(arr_X[i - 1].week_ref) >= week_ref_F) {
                    arr_Z.push(Number(arr_X[i - 1].week_ref));
                    Number(arr_X[i - 1][param]) ? arr_Z.push(Number(arr_X[i - 1][param])) : arr_Z.push(0);
                } else {
                    arr_Z.push(Number(arr_X[i - 1].week_ref));
                    arr_Z.push(null);
                }
            } else {
                if (Number(arr_X[i].week_ref) <= week_ref_L && Number(arr_X[i].week_ref) >= week_ref_F) {
                    if (!(Number(arr_X[i - 1].week_ref) == Number(arr_X[i].week_ref))) {
                        arr_Z.push(Number(arr_X[i].week_ref));
                        Number(arr_X[i][param]) ? arr_Z.push(Number(arr_X[i][param])) : arr_Z.push(0);
                    } else {
                        if (Number(arr_X[i][param])) arr_Z[arr_Z.length - 1] = arr_Z[arr_Z.length - 1] + Number(arr_X[i][param]);
                    }
                } else {
                    if (!(Number(arr_X[i - 1].week_ref) == Number(arr_X[i].week_ref))) {
                        arr_Z.push(Number(arr_X[i].week_ref));
                        arr_Z.push(null);
                    }
                }
            }
        }
        console.log('kk1', arr_Z);
        for (; m < arr_Z.length / 2; m++) {
            lineLabelsArray.push(arr_Z[2 * m]);
            lineValuesArray.push(arr_Z[2 * m + 1]);
        }
        console.log('kk2', lineLabelsArray, lineValuesArray);
        return [{
            labels: pieLabelsArray,
            values: pieValuesArray
        }, {
            labels: lineLabelsArray,
            values: [{
                data: lineValuesArray,
                label: this.PieChartParameter
            }]
        }];
    };

    public servePieAndLineArrays(data: any, param: string, Week_refs: any, dropOutCategoryArr: string[]): any {
        let arrOfObj: any[],
			arr_Z: any[] = [],
            arr_X: any[],
            lineLabelsArray: string[] = [],
            lineValuesArray: number[] = [],
            week_ref_F: number = Week_refs.week_ref_F,
            week_ref_L: number = Week_refs.week_ref_L,
            i: number = 1,
            m: number = 0;

        const checkCategory = (arr) => {
            return arr == this;
        }
        arrOfObj = JSON.parse(data['_body']);
        arrOfObj.sort((a, b) => {
            let x = Number(a.week_ref);
            let y = Number(b.week_ref);
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });

        arr_X = arrOfObj;
        for (i = 1; i < arr_X.length; i = i + 1) {
            if (arr_Z.length === 0) {
                if (Number(arr_X[i - 1].week_ref) <= week_ref_L && Number(arr_X[i - 1].week_ref) >= week_ref_F && dropOutCategoryArr.findIndex(checkCategory, arr_X[i - 1].category_desc === -1)) {

                    arr_Z.push(Number(arr_X[i - 1].week_ref));
                    Number(arr_X[i - 1][param]) ? arr_Z.push(Number(arr_X[i - 1][param])) : arr_Z.push(0);
                } else {
                    arr_Z.push(Number(arr_X[i - 1].week_ref));
                    arr_Z.push(null);
                }
            } else {
                if (Number(arr_X[i].week_ref) <= week_ref_L && Number(arr_X[i].week_ref >= week_ref_F && dropOutCategoryArr.findIndex(checkCategory, arr_X[i].category_desc) === -1)) {
                    if (!(Number(arr_X[i - 1].week_ref) == Number(arr_X[i].week_ref))) {

                        arr_Z.push(Number(arr_X[i].week_ref));
                        Number(arr_X[i][param]) ? arr_Z.push(Number(arr_X[i][param])) : arr_Z.push(0);
                    } else {
                        if (Number(arr_X[i][param])) arr_Z[arr_Z.length - 1] = arr_Z[arr_Z.length - 1] + Number(arr_X[i][param]);
                    }
                } else if (Number(arr_X[i].week_ref) <= week_ref_L && Number(arr_X[i].week_ref >= week_ref_F)) {
                    if (!(Number(arr_X[i - 1].week_ref) == Number(arr_X[i].week_ref))) {
                        arr_Z.push(Number(arr_X[i].week_ref));
                        arr_Z.push(null);
                    }
                }
            }
        }
        for (; m < arr_Z.length / 2; m++) {
            lineLabelsArray.push(arr_Z[2 * m]);
            lineValuesArray.push(arr_Z[2 * m + 1]);
        }
        console.log('kk2', lineLabelsArray, lineValuesArray);
        return {
            labels: lineLabelsArray,
            values: [{
                data: lineValuesArray,
                label: this.PieChartParameter
            }]
        };
    };
}
