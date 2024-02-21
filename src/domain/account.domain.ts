import { HttpException, HttpStatus } from "@nestjs/common";

export interface Account {
  id: string;
  UserName: string;
  balance: number;
}

export interface AccountRepository {
  getAll(): Account[];
  get(id: string): Promise<Account>;
  create(account: Account): any;
  update(account: Account): any;
  delete(id: string);
  transferMoney(from: string, to: string, amount: number): any;
}

export interface AccountUseCase {
  getAll(): Account[];
  get(id: string): Promise<Account>;
  create(account: Account): any;
  update(account: Account): any;
  delete(id: string);
  transferMoney(from: string, to: string, amount: number): any;
}

export interface AccountInterop {
  getAll(token: string): Account[];
  get(token: string, id: string): Promise<Account>;
  create(token: string, account: Account): any;
  update(token: string, account: Account): any;
  delete(token: string, id: string);
  transferMoney(from: string, to: string, amount: number): any;
}
export const ErrorAccountExists = new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
export const ErrorNegativeBalance = new HttpException('Balance cannot be negative', HttpStatus.BAD_REQUEST);
export const ErrorInsufficientBalance = new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
export const ErrorDuplicateAccounts = new HttpException('Duplicate accounts', HttpStatus.BAD_REQUEST);
export const ErrorNaN = new HttpException('Balance is not a number', HttpStatus.BAD_REQUEST);