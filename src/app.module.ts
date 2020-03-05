import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { RoleModule } from './modules/role/role.module';
import { PublicModule } from './modules/public/public.module';
import { RequestContextMiddleware } from './middlewares/request-context.middleware';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Article } from './entities/article.entity';
import { Client } from './entities/client.entity';
import { Category } from './entities/category.entity';
import { PermissionModule } from './modules/permission/permission.module';
import { Permission } from './entities/permission.entity';
import { Counter } from './entities/counter.entity';
import { LocationModule } from './modules/location/location.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([Counter]),
    UserModule,
    AuthModule,
    ClientModule,
    CategoryModule,
    ArticleModule,
    TagModule,
    RoleModule,
    PublicModule,
    PermissionModule,
    LocationModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware).forRoutes('*');
  }
}
