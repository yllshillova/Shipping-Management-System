export function validDate(inputDate: string | Date): string | undefined {
    if (inputDate) {
        const date = new Date(inputDate);

        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
    }
    return undefined;
}