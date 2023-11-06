import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private service: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(id: number, password: string): Promise<User> {
    const user = await this.service.getUser(id);
    return (await bcrypt.compare(password, user.password)) ? user : undefined;
  }

  async login(user: any) {
    const payload = { username: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
