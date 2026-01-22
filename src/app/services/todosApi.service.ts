import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  DocumentReference,
} from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import type { Todo } from '../store/todo.state';

@Injectable({ providedIn: 'root' })
export class TodosApi {
  private readonly fs = inject(Firestore);
  private readonly auth = inject(Auth);
  private readonly envInjector = inject(EnvironmentInjector);

  getTodos$(): Observable<Todo[]> {
    return runInInjectionContext(this.envInjector, () => {
      return authState(this.auth).pipe(
        switchMap((user) => {
          if (!user) {
            return EMPTY;
          }

          const ref = collection(this.fs, `users/${user.uid}/todos`);
          const q = query(ref, orderBy('createdAt', 'desc'));

          return collectionData(q, { idField: 'id' }).pipe(
            map(
              (items: any[]) =>
                items.map((x) => ({
                  id: x.id as string,
                  name: (x.name ?? '') as string,
                  description: (x.description ?? '') as string,
                  createdAt:
                    typeof x.createdAt?.toMillis === 'function'
                      ? x.createdAt.toMillis()
                      : Date.now(),
                })) as Todo[],
            ),
          );
        }),
      );
    });
  }

  addTodo(payload: { name: string; description: string }): Promise<DocumentReference> {
    return runInInjectionContext(this.envInjector, async () => {
      const uid = this.auth.currentUser?.uid;
      if (!uid) throw new Error('Not authenticated');

      const ref = collection(this.fs, `users/${uid}/todos`);
      return addDoc(ref, { ...payload, createdAt: serverTimestamp() });
    });
  }
}
