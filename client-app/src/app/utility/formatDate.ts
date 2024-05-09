export function formatDate(birthday: string | Date): string | undefined {
    if (birthday) {
        const date = new Date(birthday);
        if (!isNaN(date.getTime())) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString(); // Get the last two digits of the year

            // Return date formatted as DD-MM-YY
            return `${day}-${month}-${year}`;
        }
    }
    return undefined;
}
export function formatDateTimeLocal(dateTime: string | Date): string | undefined {
    if (dateTime) {
        const date = new Date(dateTime);
        if (!isNaN(date.getTime())) {
            // Adjust for local timezone offset
            const localDateTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

            // Format the date according to ISO 8601 standard
            const isoDateTime = localDateTime.toISOString();
            const datePart = isoDateTime.slice(0, 10); // Extract the date part (YYYY-MM-DD)
            const timePart = isoDateTime.slice(11, 16); // Extract the time part (HH:mm)

            // Combine date and time parts with a space in between
            const formattedDateTime = `${datePart} - ${timePart}`;

            return formattedDateTime;
        }
    }
    return undefined;
}