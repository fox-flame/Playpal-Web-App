import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseService } from 'src/firebase/firebase.service';
import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from 'firebase/firestore';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}
  async login(
    authDto: Omit<AuthDto, 'id'>,
  ): Promise<Omit<AuthDto, 'password'>> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.firebaseService.auth,
        authDto.email,
        authDto.password,
      );

      if (userCredential) {
        const id: string = userCredential.user.uid;
        const docRef: DocumentReference = doc(
          this.firebaseService.adminCollection,
          id,
        );

        const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
        const loggedUser: AuthDto = {
          ...snapshot.data(),
          id: snapshot.id,
        } as AuthDto;

        delete loggedUser.password;

        return loggedUser;
      }
    } catch (error) {
      console.warn('Error: ', error);
    }
  }
  async Signup(authDto: Omit<AuthDto, 'id'>): Promise<void> {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.firebaseService.auth,
          authDto.email,
          authDto.password,
        );
      if (userCredential) {
        const id: string = userCredential.user.uid;

        const docRef: DocumentReference = doc(
          this.firebaseService.adminCollection,
          id,
        );
        setDoc(docRef, { email: userCredential.user.email });
      }
    } catch (error) {
      console.warn('Error: ', error);
    }
  }
  //observer / listener
  onAuthStateChangedListener(callback) {
    return onAuthStateChanged(this.firebaseService.auth, callback);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
