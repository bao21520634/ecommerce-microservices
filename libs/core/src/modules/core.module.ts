import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
    imports: [HttpModule, CqrsModule],
    providers: [],
    exports: [HttpModule, CqrsModule],
})
export class CoreModule {}
