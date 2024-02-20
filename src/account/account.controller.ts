import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { Account, AccountInterop } from "../domain/account.domain";

@Controller('v1/account')
export class AccountController {
  constructor(@Inject('AccountInterop') private interop: AccountInterop) {
  }
  @Get('getAll')
  getAllAccounts(){
    return this.interop.getAll('token');
  }
  @Get(':id')
  getAccount(@Param('id') id: number){
    return this.interop.get('token', id);
  }
  @Post()
  createAccount(@Body() account: Account){
    return this.interop.create('token', account);
  }
  @Put()
  updateAccount(@Body() account: Account){
    return this.interop.update('token', account);
  }
  @Delete(':id')
  deleteAccount(@Param('id') id: number){
    return this.interop.delete('token', id);
  }
  @Post('transfer')
  transferMoney(@Body() body: { from: number, to: number, amount: number}){
    return this.interop.transferMoney(body.from, body.to, body.amount);
  }
}
