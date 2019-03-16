import { AngularFireAuth } from 'angularfire2/auth';
import { SigninPage } from './../signin/signin';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  displayName: string;
  imgUrl: String;
  
  constructor(
    public navCtrl: NavController, 
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    const authObserver = afAuth.authState.subscribe(user => {
      this.displayName = '';
      this.imgUrl = '';

      if (user) {
        this.displayName = user.displayName;
        this.imgUrl = user.photoURL;

        authObserver.unsubscribe();
      }
    });
  }

  signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.setRoot(SigninPage);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

}
