import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Plugins } from '@capacitor/core';
const { SplashScreen, App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private popoverCtrl: PopoverController
  ) {
    this.initializeApp();
    this.platform.backButton.subscribe(async () => {
      const element = await this.popoverCtrl.getTop();
      if (element) {
          element.dismiss();
          return;
      }

      App.exitApp();
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();
    });
  }
}
