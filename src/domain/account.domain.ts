import { HttpException, HttpStatus } from "@nestjs/common";

export interface Account {
  id: number;
  UserName: string;
  balance: number;
}

export interface AccountRepository {
  getAll(): Account[];
  get(id: number): Account;
  create(account: Account): Account;
  update(account: Account): Account;
  delete(id: number);
  transferMoney(from: number, to: number, amount: number);
}

export interface AccountUseCase {
  getAll(): Account[];
  get(id: number): Account;
  create(account: Account): Account;
  update(account: Account): Account;
  delete(id: number);
  transferMoney(from: number, to: number, amount: number);
}

export interface AccountInterop {
  getAll(token: string): Account[];
  get(token: string, id: number): Account;
  create(token: string, account: Account): Account;
  update(token: string, account: Account): Account;
  delete(token: string, id: number);
  transferMoney(from: number, to: number, amount: number);
}
export const ErrorAccountExists = new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
export const ErrorNegativeBalance = new HttpException('Balance cannot be negative', HttpStatus.BAD_REQUEST);

export const ErrorNaN = new HttpException('Balance is not a number', HttpStatus.BAD_REQUEST);