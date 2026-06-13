import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FilePublisher } from './publishers/file.publisher'; // Adjust path if needed

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [FilePublisher],
  exports: [FilePublisher], // 👈 CRITICAL: This allows other modules to use it
})
export class EventsModule {}
