import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import * as admin from 'firebase-admin';
import {
  collection,
  CollectionReference,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { ConfigService } from '@nestjs/config';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public auth: Auth;
  public firestore: Firestore;

  public adminCollection: CollectionReference;
  constructor(private configService: ConfigService) {
    this.app = initializeApp({
      apiKey: this.configService.get<string>('API_KEY'),
      authDomain: this.configService.get<string>('AUTH_DOMAIN'),
      projectId: this.configService.get<string>('PROJECT_ID_2'),
      storageBucket: this.configService.get<string>('STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('MESSAGE_SENDER_ID'),
      appId: this.configService.get<string>('APP_ID'),
      measurementId: this.configService.get<string>('MEASUREMENT_ID'),
    });
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this._createCollection();
    this.isAuthStateChanged((user) => {
      console.log('Auth state changed');
      return user;
    });
  }
  private _createCollection() {
    this.adminCollection = collection(this.firestore, 'admin');
  }

  public isAuthStateChanged(func) {
    onAuthStateChanged(
      this.auth,
      function (user) {
        if (user) {
          func(user);
        } else {
          func(false);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException('Invalid Token');
    }
    return match[1];
  }
  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);
      const { email, uid } = decodedToken;
      return { email, uid };
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
