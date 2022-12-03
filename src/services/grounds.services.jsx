import myAxios from "../axios/axiosSettings.ts";

export function getGroundsWithOwner() {
  return myAxios.get("/ground/ground-and-owner");
}

// export function markAsVerified(id, type, city) {
//   return axios.patch(
//     `https://play-o.herokuapp.com/verify/ground?id=${id}&type=${type}&city=${city}`
//   );
// }
export function markAsRejected() {}

export function markAsVerified(id, type, city) {
  return myAxios.patch(`/ground/verify?id=${id}&type=${type}&city=${city}`);
}
