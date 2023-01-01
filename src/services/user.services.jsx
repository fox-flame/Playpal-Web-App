import myAxios from "../axios/axiosSettings.ts";

export function getUserByID(id) {
  return myAxios.get(`/user/${id}`);
}
