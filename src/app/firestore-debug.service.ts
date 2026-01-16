import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreDebugService {
  private fs = inject(Firestore);

  async readUser() {
    const ref = doc(this.fs, 'users/test-user');
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.warn('Document does not exist');
      return;
    }

    console.log('Firestore data:', snap.data());
  }
}
