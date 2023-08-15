import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): { message; statusCode } {
    return { message: 'Yaayy!! API is working', statusCode: 200 };
  }
}
