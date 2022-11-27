import axios from "axios";
import Axios from "../axios/axiosSettings.ts";

export function getGroundsWithOwner() {
  return axios.get("https://play-o.herokuapp.com/ground-and-owner");
}

// export function markAsVerified(id, type, city) {
//   return axios.patch(
//     `https://play-o.herokuapp.com/verify/ground?id=${id}&type=${type}&city=${city}`
//   );
// }
export function markAsRejected() {}

export function markAsVerified(id, type, city) {
  return Axios.patch(`/ground/verify?id=${id}&type=${type}&city=${city}`);
}
