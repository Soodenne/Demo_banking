import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Account } from "../../domain/account.domain";
@Injectable()
export class FirestoreRepositoryService {
  private firestore: admin.firestore.Firestore;

  constructor() {
    this.firestore = admin.firestore();
  }
  //get all accounts
  async getAll(): Promise<Account[]> {
    try {
      const accounts = await this.firestore.collection('accounts').get();
      return accounts.docs.map(doc => doc.data() as Account);
    } catch (error) {
      console.error('Error getting accounts from Firebase:', error);
      throw error;
    }
  }
  //add account
  async pushAccount(account: Account): Promise<void> {
    try {
      const pushData = {
        ...account,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      };
      await this.firestore.collection('accounts').doc(account.id).set(pushData);
    } catch (error) {
      console.error('Error pushing account to Firebase:', error);
      throw error;
    }
  }
  //update account
  async updateAccount(account: Account): Promise<void> {
    try {
      if (!account || !account.id) {
        throw new Error('Invalid account data: ID required.');
      }

      const updateData = {
        ...account,
        timestamp: admin.firestore.FieldValue.serverTimestamp(), // Add server timestamp
      };

      await this.firestore.collection('accounts').doc(account.id).set(updateData);
    } catch (error) {
      console.error('Error updating account in Firebase:', error);
      throw error;
    }
  }
  //delete account
  async deleteAccount(id: string): Promise<void> {
    try {
      await this.firestore.collection('accounts').doc(id).delete();
    } catch (error) {
      console.error('Error deleting account from Firebase:', error);
      throw error;
    }
  }
  //transfer money
  async transferMoney(from: string, to: string, amount: number): Promise<void> {
    try {
      await this.firestore.runTransaction(async transaction => {
        const fromDocument = await transaction.get(this.firestore.collection('accounts').doc(from));
        const toDocument = await transaction.get(this.firestore.collection('accounts').doc(to));
        console.log(fromDocument.data());
        console.log(toDocument.data());
        const fromAccount = fromDocument.data();
        const toAccount = toDocument.data();
        if (fromAccount.balance < amount) {
          throw new Error('Insufficient balance');
        }
        if (fromAccount.id === toAccount.id) {
          throw new Error('Duplicate accounts');
        }

        transaction.update(fromDocument.ref, { balance: fromAccount.balance - amount });
        transaction.update(toDocument.ref, { balance: toAccount.balance + amount });
      });
    } catch (error) {
      console.error('Error transferring money in Firebase:', error);
      throw error; // Re-throw for further handling
    }
  }
// get account by id
  async getAccountById(id: string): Promise<Account> {
    try {
      const account = await this.firestore.collection('accounts').doc(id).get();
      return account.data() as Account;
    } catch (error) {
      console.error('Error getting account from Firebase:', error);
      throw error;
    }
  }
}
