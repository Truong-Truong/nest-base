import { SetMetadata } from '@nestjs/common';

export const LOG_ENTRY_KEY = 'logEntry';
export const LogEntry = () => SetMetadata(LOG_ENTRY_KEY, true);
