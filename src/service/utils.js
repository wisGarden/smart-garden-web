function handleDuringTime(timeString) {
  let [start_time, end_time] = timeString.split('-');
  start_time = new Date(parseInt(start_time));
  end_time = new Date(parseInt(end_time));
  return {
    start_time: start_time.toLocaleString(),
    end_time: end_time.toLocaleString(),
    gap: end_time - start_time
  }
}

function handleTimeFormat(mss) {
  const days = parseInt(mss / (1000 * 60 * 60 * 24));
  const hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = (mss % (1000 * 60)) / 1000;
  return days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒 ";
}

export default {
  handleDuringTime,
  handleTimeFormat
}