import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private fakeUsers = [{ username: 'Isaac', email: 'isaac@isaac.com' }];
  fetchUsers() {
    return this.fakeUsers;
  }
}
