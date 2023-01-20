import moment from 'moment';
import timezone from 'moment-timezone';



const getMonths = () => {
    const months = moment.months();
    const arr = [];
    for (let i = 0; i < 12; i++) {
        arr.push({
            value: i + 1,
            description: months[i]
        })
    }
    return arr;
}


const getYearsByYearInterval = interval => {
    const today = new Date();
    const currentYear = today.getUTCFullYear();
    const arr = [];
    for (let i = currentYear + interval; i >= currentYear - interval; i--) {
        arr.push(i);
    }
    return arr;
}

export default {
    getMonths,
    getYearsByYearInterval
}
