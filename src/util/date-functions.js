
export function getISODateSTR (date) {
    return date.toISOString().substring(0,10)
}
export function getEndDate(startDateStr, days) {
    const date = new Date(startDateStr);
    const endDate = new Date(date.setDate(date.getDate() + days));
    return getISODateSTR(endDate)
}