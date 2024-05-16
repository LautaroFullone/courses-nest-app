import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //agarra el token bearer
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    //lo que retorna una vez validado el token, si esta autorizado ejecuta esto
    async validate(payload: { id: string }) { 
        //el id es lo que viene decodificado del token, con eso usco en la bd al user
        const user = await this.userModel.findById(payload.id)
        return user;
    }
}