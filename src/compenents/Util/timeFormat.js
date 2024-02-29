import dayjs from 'dayjs';

const TimeFormat= (x) => {
    return(dayjs(x).format('YYYY-MM-DD'));
}

export default TimeFormat;