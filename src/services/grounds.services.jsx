import axios from "axios";

export function getGroundsWithOwner() {
  return axios.get("https://play-o.herokuapp.com/ground-and-owner");
}

export function markAsVerified(id, type, city) {
  return axios.patch(
    `https://play-o.herokuapp.com/verify/ground?id=${id}&type=${type}&city=${city}`
  );
}
export function markAsRejected() {}
