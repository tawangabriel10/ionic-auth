import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
    // IR PARA A HOMEPAGE AUTOMATICAMENTE CASO O USUARIO JÀ ESTEJA LOGADO
    const authObserver =  afAuth.authState
          .subscribe((user) => {
            if (user) {
              this.rootPage = HomePage;
              authObserver.unsubscribe();
            } else {
              this.rootPage = SigninPage;
              authObserver.unsubscribe();
            }
          });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

