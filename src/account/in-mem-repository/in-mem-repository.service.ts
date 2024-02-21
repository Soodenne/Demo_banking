import { Injectable } from '@nestjs/common';
import { Account, AccountRepository } from "../../domain/account.domain";
import { DirectoryInt } from "../../utils/directory.utils";
import { from } from "rxjs";

@Injectable()
export class InMemRepositoryService implements AccountRepository{
  private accounts: DirectoryInt<Account>;
  constructor() {
    this.accounts = {};
  }
  //get all accounts
  getAll(): Account[] {
    return Object.values(this.accounts); // Convert to array
  }
  //get account by id
  async get(id: string): Promise<Account> {
    return this.accounts[id]
  }

  update(account: Account): Account {
    return this.accounts[account.id] = account;
  }
  create(account: Account): Account {
    return this.accounts[account.id] = account;
  }

  delete(id: string) {
    delete this.accounts[id];
  }
  transferMoney(from: string, to: string, amount: number) {
    this.transferMoney(from, to, amount);
  }
}
