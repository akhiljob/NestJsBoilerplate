import { Module } from '@nestjs/common';
import { Logger } from './Logger';
import { AuthGuard } from './guards/AuthGuard';

@Module({
  imports: [],
  providers: [Logger, AuthGuard],
  exports: [Logger, AuthGuard],
})
export class CommonModule {}
export { AuthGuard };
export * from './guards/AuthGuard';
