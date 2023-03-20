import { ConsoleLogger } from '@nestjs/common';

export class AppLogger extends ConsoleLogger {
    logMessage: string;

    log(message: any, ...optionalParams: any[]) {
        this.logMessage = 'for Recipe API> ' + message
        super.log(this.logMessage);
    }

    error(message: any, stack?: string, context?: string) {
        this.logMessage = 'for Recipe API> ' + message + ' > More details:' + stack;
        super.error(this.logMessage);
    }
}