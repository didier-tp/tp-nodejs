import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiDescription(): string {
    return 'bank-api : REST api for TP bank (account, customer, ...)';
  }
}
