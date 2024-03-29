import { NotificationsService } from './notifications.service';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app'; 

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth, 
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    private notificationsService: NotificationsService
  ) {
    this.user = angularFireAuth.authState;
  }

  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signIn(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signInWithGoogle() {
    return this.googlePlus.login({
      'webClientId': '101387271131-69hvo5qevhhlg4btjl066tp3sh1udhfb.apps.googleusercontent.com',
      'offline': true
    })
    .then(res => {
      return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then((user: firebase.User) => {

            return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl });
          });
    });
  }

  signWithFacebook() {
    return this.facebook.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
          return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
        });
  }

  signOut() {
    if (this.angularFireAuth.auth.currentUser.providerData.length) {
      for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
        var provider = this.angularFireAuth.auth.currentUser.providerData[i];

        if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
          return this.googlePlus.disconnect()
              .then(() => {
                return this.signOutFirebase();
              });
        } else if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
          return this.facebook.logout()
              .then(() => {
                return this.signOutFirebase();
              });
        }
      }
    }

    return this.signOutFirebase();
  }

  signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

}
