import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Plugins } from '@capacitor/core';

const { LocalNotifications } = Plugins;

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
    setTimeout(() => {
      this.notify();
    }, 5000);
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

  async notify() {
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: `LAST BID: ${this.selected}-BRL EXCHANGE RATE`,
          body: this.bid,
          id: 1,
          schedule: { repeats: true, on: { hour: 8, minute: 15 } },
        },
        {
          title: `LAST BID: ${this.selected}-BRL EXCHANGE RATE`,
          body: this.bid,
          id: 2,
          schedule: { repeats: true, on: { hour: 17, minute: 30 } },
        }
      ]
    });
  }

  selectExchange(event) {
    console.log(this.previewSelected);

    if (this.selected !== 'BRL' && this.previewSelected === 'BRL') {
      console.log('ok');

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
