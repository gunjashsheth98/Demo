import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Data } from 'src/app/data';
import { DatePipe, formatDate } from '@angular/common';
import moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test';
  data:Data[];
  abc:Data[];
  abc2:Data[];
  abc3:Data[];
  date;
  format1: string = "";

  constructor(private httpClient: HttpClient,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.httpClient.get("https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll").subscribe((data:any) =>{
      (this.data = (data.list));

      this.abc = this.data.filter((b)=>{
        return b.status == 'active';
      });
      for(let a of this.abc){
        a.date = moment(a.date,"DD/MM/YYYY").format('DD/MM/YYYY');
      }
      this.abc = _.sortBy(this.abc, function(o) { return moment(o.date,"DD/MM/YYYY"); }, ['asc']);
      this.abc2 = this.data.filter((b)=>{
        return b.status == 'left';
      });
      for(let a of this.abc2){
        a.date = moment(a.date,"DD/MM/YYYY").format('DD/MM/YYYY');
      }
      this.abc2 = _.sortBy(this.abc2, function(o) { return new moment(o.date,"DD/MM/YYYY"); }, ['asc']);
      this.abc3 = this.data.filter((b)=>{
        return b.status == 'onboarded';
      });
      for(let a of this.abc3){
        a.date = moment(a.date,"DD/MM/YYYY").format('DD/MM/YYYY');
      }
      this.abc3 = _.sortBy(this.abc3, function(o) { return new moment(o.date,"DD/MM/YYYY"); }, ['asc']);
    });
  }
}


