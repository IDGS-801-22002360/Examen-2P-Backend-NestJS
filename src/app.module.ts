import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SalesModule } from './sales/sales.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL.replace(/^"|"$/g, ''),
            autoLoadEntities: true,
            synchronize: true,
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME || process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE || process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
            ssl: {
              rejectUnauthorized: false,
            },
          },
    ),
    SalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
