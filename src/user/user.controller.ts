import {Body, Controller, Logger, Post} from '@nestjs/common';
import * as Joi from 'Joi';

import {Response, ResponseMessage} from '../util/response.util';
import {loginSchema, registerSchema} from './user.schema';
import {UserService} from './user.service';
import {Login, Register, UserInfo} from './user.type';
import {ValidationError} from 'Joi';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Post('register')
    public async addUser(@Body() register: Register): Promise<Response> {
        try {
            const {value, error}: { value: Register, error: ValidationError } = Joi.validate(register, registerSchema);

            if (error) {
                Logger.error(error);
                return new ResponseMessage().error(999).body('Parameter Error').build();
            }

            const user: UserInfo = await this.userService.addUser(value);

            return new ResponseMessage().success().body(user).build();
        } catch (err) {
            Logger.error(err);
        }
    }

    @Post('login')
    public async login(@Body() login: Login): Promise<Response> {
        const {value, error} = Joi.validate(login, loginSchema);

        if (error) {
            Logger.error(error);
            return new ResponseMessage().error(999).body('Parameter Error').build();
        }

        const user = await this.userService.login(value);

        if (!user) {
            return new ResponseMessage().error(999, 'Login Error').build();
        }

        return new ResponseMessage().success().body(user).build();
    }
}
