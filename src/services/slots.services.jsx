import myAxios from "../axios/axiosSettings.ts";

export function getAvailableSlots(gid, date) {
  return myAxios.get(`/booking/slots?groundID=${gid}&date=${date}`);
}
