import { Inject, Injectable } from "@nestjs/common";
import { Account, AccountInterop, AccountUseCase } from "../../domain/account.domain";
import { BaseUseCaseService } from "../base-usecase/base-usecase.service";
import { AuthUseCase, ErrMessUnauthorized } from "../../domain/auth.domain";

@Injectable()
export class BaseInteropService implements AccountInterop{
  constructor(@Inject('AccountUseCase')private accountUseCase: AccountUseCase, @Inject('AuthBaseUsecaseService') private authUseCase: AuthUseCase,
  ) {
  }

  getAll(token: string): Account[] {
    return this.accountUseCase.getAll();
  }

  async create(token: string, account: Account) {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);

      account.id = decodedToken.uid;

      console.log(decodedToken)
      return this.accountUseCase.create(account);
    } catch (error) {
      throw error;
    }
  }

  async delete(token: string, id: string) {
    await this.authUseCase.verifyToken(token);
    return this.accountUseCase.delete(id);
  }

  async get(token: string, id: string): Promise<Account> {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      let account = await this.accountUseCase.get(decodedToken.uid);
      return account;
    } catch (error) {
      throw ErrMessUnauthorized;
    }
  }

  async update(token: string, account: Account): Promise<Account> {
    await this.authUseCase.verifyToken(token);
    return this.accountUseCase.update(account);
  }
  transferMoney(from: string, to: string, amount: number) {
    this.accountUseCase.transferMoney(from, to, amount);
  }
}
