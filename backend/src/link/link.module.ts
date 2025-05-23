import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from './schema/link.schema';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Link.name , schema:LinkSchema} , { name: User.name, schema: UserSchema }]),
            UserModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
