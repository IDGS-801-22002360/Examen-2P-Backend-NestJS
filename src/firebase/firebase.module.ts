import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

const firestoreProvider = {
  provide: 'FIRESTORE_DB',
  useFactory: () => {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountString) {
      throw new Error('La variable de entorno FIREBASE_SERVICE_ACCOUNT no está definida.');
    }

    const serviceAccount = JSON.parse(serviceAccountString);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    return admin.firestore();
  },
};

@Global()
@Module({
  providers: [firestoreProvider],
  exports: [firestoreProvider],
})
export class FirebaseModule {}