import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }

  getGoodbye() {
    return { title: 'hola!', message: 'soy un mensaje'}
  }
}
