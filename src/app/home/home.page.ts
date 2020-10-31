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
  bid: string;
  selected = 'EUR';

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    this.getData();
    setInterval(() => {
      this.getData();
      this.notify();
    }, 3600000);
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

  async notify() {
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: `${this.selected}-BRL X-RATE`,
          body: this.bid,
          id: 1,
          schedule: { repeats: true, on: { hour: 8, minute: 15 } },
        },
        {
          title: `${this.selected}-BRL X-RATE`,
          body: this.bid,
          id: 2,
          schedule: { repeats: true, on: { hour: 17, minute: 15 } },
        }
      ]
    });
  }

  selectExchange(event) {
    this.selected = event.target.value;
    this.getData();
  }
}
