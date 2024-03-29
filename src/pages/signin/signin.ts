import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService) {
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  resetPassword() {
    this.navCtrl.push(ResetpasswordPage);
  }

  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido!');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado!');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado!');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida!');
          }
          toast.present();
        });
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
        .then(() => {
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar login!' })
              .present();
        });
  }

  signInWithFacebook() {
    this.authService.signWithFacebook()
        .then(() => {
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar login!' })
              .present();
        });
  }

}
