import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const db_url = configService.get<string>('DB_HOST');
        return {
          uri: db_url,
          connectionFactory: (connection) => {
            console.log('DB URL:', db_url);

            connection.on('connected', () => {
              console.log('DB connected Successfully');
            });

            connection.on('disconnected', () => {
              console.log('DB disconnected Successfully');
            });

            connection.on('error', (error) => {
              console.log('DB Not connected', error);
            });

            return connection;
          },
        };
      },
    }),
  ],
})
export class DBModule {}
