import { Module } from '@nestjs/common';
import { EmailService } from './email-sender.service';

@Module({
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
