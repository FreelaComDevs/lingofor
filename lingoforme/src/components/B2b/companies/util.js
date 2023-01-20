import moment from 'moment';
import timezone from 'moment-timezone';


export function getListOfFilterDates() {
    const year = moment().year() + 5;
    const end = moment().set({year, hour: 10, minute: 0, second: 0 });
    const start = moment('2018-12-01:10:00:00'); //end.clone().subtract(6, 'months');
    const diff = end.diff(start, 'months');
    const dates = [];
    for (let i = 0; i <= diff; i++) {
        const dt = start.clone().add(i, 'months');
        dates.push({
            value: dt.format('YYYY-MM-01'),
            description: dt.format('MMMM/YYYY')
        })
    }
    return dates;
}

export function getFormattedTimezone (value) {
    return moment.tz(value).format('LT')
}

export default {
    getListOfFilterDates,
    getFormattedTimezone
}
