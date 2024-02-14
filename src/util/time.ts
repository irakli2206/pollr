import moment from "moment"


export const getFriendlyDate = (timestamp: string) => {
    return moment(timestamp).format('MMMM D, YYYY')
}