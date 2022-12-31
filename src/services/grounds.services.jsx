import myAxios from "../axios/axiosSettings.ts";

export function getGroundsWithOwner() {
  return myAxios.get("/ground/ground-and-owner");
}

export function getMyBookings(id) {
  return myAxios.get(`/booking/ground/${id}`);
}

export function registerGround(data = {}) {
  const {
    name,
    city,
    mapAddress,
    bookingRate,
    sports,
    website,
    openAt,
    closeAt,
    description,
    ownerID,
  } = data;
  return myAxios.post("/ground/register", {
    bookingRate: parseInt(bookingRate),
    city: city,
    closeAt: closeAt,
    description: description,
    mapAddress: mapAddress,
    name: name,
    openAt: openAt,
    ownerID: ownerID,
    sports: sports,
    website: website,
  });
}

export function uploadImages(payload) {
  return myAxios.post("/upload-image", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function getGroundImages(id) {
  return myAxios.get(`/upload-image/groundImgs/${id}`);
}

export function findGroundByID(id) {
  return myAxios.get(`/ground/${id}`);
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

export function isSlot(id) {
  return myAxios.get(`/booking/slot/${id}`);
}

export function getGroundSlots(id) {
  return myAxios.get(`/booking/ground-slots/${id}`);
}

export function updateGroundTime(payload) {
  return myAxios.patch("/booking/update-time", payload);
}

export function createBooking(payload) {
  return myAxios.post("/booking", payload);
}
