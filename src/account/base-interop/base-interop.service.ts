import { Inject, Injectable } from "@nestjs/common";
import { Account, AccountInterop, AccountUseCase } from "../../domain/account.domain";
import { BaseUseCaseService } from "../base-usecase/base-usecase.service";

@Injectable()
export class BaseInteropService implements AccountInterop{
  constructor(@Inject('AccountUseCase')private accountUseCase: AccountUseCase) {
  }

  getAll(token: string): Account[] {
    return this.accountUseCase.getAll();
  }

  create(token: string, account: Account): Account {
    return this.accountUseCase.create(account);
  }

  delete(token: string, id: number) {
    return this.accountUseCase.delete(id);
  }

  get(token: string, id: number): Account {
    return this.accountUseCase.get(id);
  }

  update(token: string, account: Account): Account {
    return this.accountUseCase.update(account);
  }
  transferMoney(from: number, to: number, amount: number) {
    this.accountUseCase.transferMoney(from, to, amount);
  }
}
