import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FCM } from "@ionic-native/fcm/ngx";

@Injectable()
export class NotificationsService {

    constructor(
        private fcm: FCM
    ) {}


    getToken(): Promise<string> {
        return this.fcm.getToken()
            .then((token: string) => {
                return token;
            }).catch();
    }

    observerTokenRefresh(): Observable<string> {
        return this.fcm.onTokenRefresh();
    }

    observerNotification(): Observable<any> {
        return this.fcm.onNotification();
    }
}