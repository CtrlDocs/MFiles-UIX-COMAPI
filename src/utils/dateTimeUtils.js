CtrlDocs.DateTimeHelpers = class DateTimeHelpers {
    static protobufDateToJsDate(timestamp) {
        // Convert seconds to milliseconds
        const millisFromSeconds = timestamp.seconds * 1000;

        // Convert nanoseconds to milliseconds
        const millisFromNanos = timestamp.nanos / 1e6;

        // Sum both milliseconds values to get the total
        const totalMillis = millisFromSeconds + millisFromNanos;

        // Create a JavaScript Date object
        return new Date(totalMillis);
    }
    
    static JsDateToProtobufDate(date) {
        const parsedDate = new Date(date);
        
        // Convert date to milliseconds since epoch
        const totalMillis = parsedDate.getTime();

        // Get the seconds by dividing by 1000 and flooring the result
        const seconds = Math.floor(totalMillis / 1000);

        // Get the nanoseconds by taking the remainder of milliseconds, then converting to nanoseconds
        const nanos = (totalMillis % 1000) * 1e6;

        // Create the Protobuf timestamp format
        return { seconds, nanos };
    }
}