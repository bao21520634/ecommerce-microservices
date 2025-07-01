import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Checks if a value looks like a Protobuf timestamp object
 */
function isProtobufTimestamp(value: any): boolean {
    return (
        value !== null &&
        typeof value === 'object' &&
        'seconds' in value &&
        'nanos' in value &&
        typeof value.seconds === 'object' && // For Long objects
        'low' in value.seconds &&
        'high' in value.seconds &&
        'unsigned' in value.seconds &&
        typeof value.nanos === 'number'
    );
}

/**
 * Converts a Protobuf timestamp to a JavaScript Date
 */
function convertProtobufTimestampToDate(timestamp: any): any {
    if (!timestamp) return null;

    // Handle Long objects
    const seconds =
        typeof timestamp.seconds === 'object' && 'low' in timestamp.seconds
            ? Number(timestamp.seconds.low) +
              Number(timestamp.seconds.high) * 4294967296 // 2^32
            : Number(timestamp.seconds);

    const nanos = Number(timestamp.nanos) || 0;

    // Convert to milliseconds and create Date
    return new Date(seconds * 1000 + nanos / 1000000);
}

/**
 * Recursively processes an object to convert all Protobuf timestamps to JS Dates
 */
function convertProtobufDatesToJsDates(obj: any): any {
    if (!obj) return obj;

    // If it's not an object, return as is
    if (typeof obj !== 'object') return obj;

    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map((item) => convertProtobufDatesToJsDates(item));
    }

    // Process object properties
    const result = { ...obj };
    for (const key in result) {
        const value = result[key];

        // Check if it's a protobuf timestamp
        if (isProtobufTimestamp(value)) {
            result[key] = convertProtobufTimestampToDate(value);
        }
        // Recursively process nested objects
        else if (value && typeof value === 'object') {
            result[key] = convertProtobufDatesToJsDates(value);
        }
    }

    return result;
}

@Injectable()
export class TimestampInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // Convert all Protobuf timestamps to JS Dates in the response
                return convertProtobufDatesToJsDates(data);
            }),
        );
    }
}
