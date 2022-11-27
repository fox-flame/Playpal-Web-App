import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  collection,
  CollectionReference,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public auth: Auth;
  public firestore: Firestore;

  public adminCollection: CollectionReference;
  constructor() {
    this.app = initializeApp({
      apiKey: 'AIzaSyDtDdYDmPCIL71n77x-L0HvM3RbilIAMhA',
      authDomain: 'play-pal-a1403.firebaseapp.com',
      projectId: 'play-pal-a1403',
      storageBucket: 'play-pal-a1403.appspot.com',
      messagingSenderId: '752586541921',
      appId: '1:752586541921:web:50d36804b26ad08ed09320',
      measurementId: 'G-F3XBGRBZWB',
    });
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);

    this._createCollection();
  }
  private _createCollection() {
    this.adminCollection = collection(this.firestore, 'admin');
  }
}
