import { Inject, Injectable } from "@nestjs/common";
import {
  Account,
  AccountRepository,
  AccountUseCase,
  ErrorAccountExists, ErrorDuplicateAccounts, ErrorInsufficientBalance, ErrorNaN,
  ErrorNegativeBalance
} from "../../domain/account.domain";
import * as process from "process";
import { from } from "rxjs";

@Injectable()
export class BaseUseCaseService implements AccountUseCase{
  constructor(@Inject('AccountRepository') private repo: AccountRepository){

  }
  getAll(): Account[] {
    return this.repo.getAll();
  }
  async get(id: string): Promise<Account> {
    return this.repo.get(id);
  }
  update(account: Account): Account {
    return this.repo.update(account);
  }
  async create(account: Account): Promise<Account> {
    let existed = await this.repo.get(account.id);
    const isNotNumber = isNaN(account.balance);
    const isNegative = account.balance < 0;
    if (isNotNumber) {
      throw ErrorNaN;
    }
    if(isNegative){
      throw ErrorNegativeBalance;
    }
    if(existed){
      throw ErrorAccountExists;
    }
    return this.repo.create(account);
  }
  delete(id: string): Account {
    return this.repo.delete(id);
  }
  async transferMoney(from: string, to: string, amount: number) {
    let fromAccount = this.repo.get(from);
    let toAccount = this.repo.get(to);
    if((await fromAccount).balance < amount){
      throw ErrorInsufficientBalance;
    }
    if((await fromAccount).id === (await toAccount).id){
      throw ErrorDuplicateAccounts;
    }
    (await fromAccount).balance -= amount;
    (await toAccount).balance += amount;
    this.update(await fromAccount);
    this.update(await toAccount);
  }
}
