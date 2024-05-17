import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/model/user.schema';

@Module({})
export class EventMailModule {

    @OnEvent('user.register')
    handleUserRegisterEvent(user: UserDocument) {
        console.log('user register event: ',user)
        // handle and process "UserRegisterEvent" event
    }

    @OnEvent('user.login')
    handleUserLoginEvent(user: UserDocument) {
        console.log('user login event: ', user)
        // handle and process "UserLoginEvent" event
    }
}
