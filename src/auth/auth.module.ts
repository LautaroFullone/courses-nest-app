import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/model/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    // JwtModule.register({  //MANERA SINCRONICA SI EN VEZ DE USAR .ENV USAMOS ALGO COMO jwtConstants.secret (file dentro del repo)
    //   //global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({   //SE HACE DE MANERA ASINCRONICA PARA QUE DE TIEMPO A CARGAR EL .ENV
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '10m' },
        }
      }
    }),
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema }
      ]
    )
  ], 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
