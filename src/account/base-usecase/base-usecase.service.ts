import { Inject, Injectable } from "@nestjs/common";
import {
  Account,
  AccountRepository,
  AccountUseCase,
  ErrorAccountExists, ErrorNaN,
  ErrorNegativeBalance
} from "../../domain/account.domain";

@Injectable()
export class BaseUseCaseService implements AccountUseCase{
  constructor(@Inject('AccountRepository') private repo: AccountRepository){

  }
  getAll(): Account[] {
    return this.repo.getAll();
  }
  get(id: number): Account {
    return this.repo.get(id);
  }
  update(account: Account): Account {
    return this.repo.update(account);
  }
  create(account: Account): Account {
    let existed = this.repo.get(account.id);
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
  delete(id: number): Account {
    return this.repo.delete(id);
  }
  transferMoney(from: number, to: number, amount: number) {
    let fromAccount = this.repo.get(from);
    let toAccount = this.repo.get(to);
    if(fromAccount.balance < amount){
      throw ErrorNegativeBalance;
    }
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    this.update(fromAccount);
    this.update(toAccount);
  }
}
