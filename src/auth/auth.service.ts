import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService, 
                @InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    public async handleLogin(userBody: LoginAuthDto) {
        const { password } = userBody;
        const userExist = await this.userModel.findOne({email: userBody.email});

        if (!userExist) throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);

        const check = await compareHash(password, userExist.password)
        if (!check) throw new HttpException('Contraseña incorrecta', HttpStatus.FORBIDDEN);

        const userFlat = userExist.toObject()
        delete userFlat.password;

        const payload = {
            id: userFlat._id,
        }

        const token = this.jwtService.sign(payload)

        const data = {
            token,
            user: userFlat
        }

        return data
    }

    public async handleRegister(userBody: RegisterAuthDto) {
        const { password, ...user } = userBody;

        const userParse = {
            ...user, 
            password: await generateHash(password)
        }
        return this.userModel.create(userParse)
    }
}
