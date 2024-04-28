import { Injectable, inject } from '@angular/core';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, Auth, signOut, authState } from '@angular/fire/auth';
import { User } from '@firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private auth: Auth = inject(Auth);
  
  constructor() { }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    // this.user$.next(null);
    //signOut(this.auth);
    this.auth.signOut();
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  get checkAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

}
