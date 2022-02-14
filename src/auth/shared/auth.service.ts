import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../models/user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        
        if (!user)
        throw new HttpException('Email não encontrado', HttpStatus.UNPROCESSABLE_ENTITY);

        if(user && await bcrypt.compare(password, user.password)){
            const { id, email } = user;
            return { id, email };
        }
        
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

}
