import { SignupPage } from './../pages/signup/signup';
import { ResetpasswordPage } from './../pages/resetpassword/resetpassword';
import { SigninPage } from './../pages/signin/signin';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../providers/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

const firebaseConfig = {
  apiKey: "AIzaSyATTWw-00ssY4Tk9GqRN8Z336PJaVAKCvk",
  authDomain: "ionic-auth-d57bb.firebaseapp.com",
  databaseURL: "https://ionic-auth-d57bb.firebaseio.com",
  projectId: "ionic-auth-d57bb",
  storageBucket: "ionic-auth-d57bb.appspot.com",
  messagingSenderId: "101387271131"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    ResetpasswordPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    ResetpasswordPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    GooglePlus,
    Facebook
  ]
})
export class AppModule {}
