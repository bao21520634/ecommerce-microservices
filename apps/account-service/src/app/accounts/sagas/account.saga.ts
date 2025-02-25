import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserLoggedInEvent } from '../events/impl';

@Injectable()
export class AccountSaga {
    logger = new Logger(this.constructor.name);

    public constructor(private readonly commandBus: CommandBus) {}

    @Saga()
    authCreated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserLoggedInEvent),
            delay(1000),
            map((event) => {
                Logger.log(
                    'Inside [AuthSagas] Saga',
                    JSON.stringify(event.user),
                );
                return null;
            }),
        );
    };
}
