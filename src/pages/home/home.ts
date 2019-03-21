import { NotificationsService } from './../../providers/notifications.service';
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

  listNotification: string[] = [];
  
  constructor(
    public navCtrl: NavController, 
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private notificationsService: NotificationsService
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

    this.getNotifications();
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

  private getNotifications(): void {
    this.notificationsService.observerNotification()
        .subscribe((notification: any) => {

          console.log(notification);
          this.listNotification.push(JSON.stringify(notification));
        });
  }

}
