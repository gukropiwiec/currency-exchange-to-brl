import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  bid: any;
  selected = 'EUR';
  lastNBRL = 'EUR';
  previewSelected = 'BRL';
  numberSelected = 1;

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    try {
      this.http.get(environment.API_URL).subscribe((res: any) => {
        switch (this.selected) {
          case 'EUR':
            this.bid = res.EUR.bid;
            break;
          case 'USD':
            this.bid = res.USD.bid;
            break;
          case 'CAD':
            this.bid = res.CAD.bid;
            break;
          case 'GBP':
            this.bid = res.GBP.bid;
            break;
          case 'ARS':
            this.bid = res.ARS.bid;
            break;
          case 'JPY':
            this.bid = res.JPY.bid;
            break;
          case 'BRL':
            this.calculateBRL(res);
            break;
          default:
            this.bid = res.EUR.bid;
            break;
        }
        localStorage.setItem('lastBid', this.bid);
      });
    } catch (error) {
      this.bid = localStorage.getItem('lastBid');
    }
  }

  calculateBRL(allBids) {
    switch (this.lastNBRL) {
      case 'EUR':
        this.bid = 1 / allBids.EUR.bid;
        break;
      case 'USD':
        this.bid = 1 / allBids.USD.bid;
        break;
      case 'CAD':
        this.bid = 1 / allBids.CAD.bid;
        break;
      case 'GBP':
        this.bid = 1 / allBids.GBP.bid;
        break;
      case 'ARS':
        this.bid = 1 / allBids.ARS.bid;
        break;
      case 'JPY':
        this.bid = 1 / allBids.JPY.bid;
        break;
      default:
        this.bid = 1 / allBids.EUR.bid;
        break;
    }
  }

  selectExchange(event) {
    if (this.selected !== 'BRL' && this.previewSelected === 'BRL') {
    }

    this.selected = event.target.value;
    this.getData();
  }

  numberChange(value) {
    this.numberSelected = Number(value);
  }

  changeType() {
    if (this.selected !== 'BRL') {
      this.previewSelected = this.selected;
      this.lastNBRL = this.selected;
      this.selected = 'BRL';
    } else {
      this.previewSelected = 'BRL';
      this.selected = this.lastNBRL;
    }
  }
}
