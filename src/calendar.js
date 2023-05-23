const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
const days = ['อา','จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส' ]
export const LOCALE = {
  localize: {
    month: n => months[n],
    day: n => days[n],
  },
  formatLong: {}
}