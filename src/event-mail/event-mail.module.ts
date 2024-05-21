import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/model/user.schema';

@Module({})
export class EventMailModule {

    constructor(private readonly mailService: MailerService) {}

    @OnEvent('user.register')
    handleUserRegisterEvent(user: UserDocument) {
        console.log('# handleUserRegisterEvent: ',user)

        this.mailService.sendMail({
            to: user.email,
            subject: 'Bienvenido a esta app de NESTJS !!',
            template: 'welcome',
            context: {
                name: user.name
            }
        })
    }

    @OnEvent('user.login')
    handleUserLoginEvent(user: UserDocument) {
        console.log('user login event: ', user)
        // handle and process "UserLoginEvent" event
    }
}
