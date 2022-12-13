import { useState, useContext } from "react";
import FormInput from "../../components/Input/input-field.component";
import {
  createBooking,
  findGroundByID,
  isSlot,
  registerGround,
  uploadImages,
} from "../../services/grounds.services";
import { UserContext } from "../../context/user.context";
import { useEffect } from "react";
import FirstLoader from "../../components/startingLoader/firstLoader.component";
import { Calendar } from "react-calendar";
import Viewer from "../../components/imageViewer/viewer.component";
import * as moment from "moment";

const defaultFormFields = {
  name: "",
  mapAddress: "",
  sports: "",
  city: "",
  bookingRate: 0,
  website: "",
  openAt: "",
  closeAt: "",
  description: "",
  ownerID: "",
};
const defaultBookingFields = {
  status: "",
  start1: "", //start time for slot 1 and so on..
  close1: "",
  start2: "",
  close2: "",
};
const MyGround = () => {
  const { currentUser } = useContext(UserContext);
  const [noGround, setNoGround] = useState(false);
  const [myGround, setMyGround] = useState({});
  const [isVerified, setVerified] = useState();
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [bookingFields, setBookingFields] = useState(defaultBookingFields);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [groundID, setGroundID] = useState("");
  const [slots, setSlots] = useState([]);
  const [isSlotCreated, setCreatedSlot] = useState(null);
  // if Slot is not created, then create ground in bookings documents

  useEffect(() => {
    // console.log(date.getDate(), " ", date.getMonth(), " ", date.getFullYear());
    findGroundByID(currentUser.uid).then((res) => {
      if (Object.keys(res.data).length === 0) {
        setNoGround(true);
      } else {
        Object.keys(res.data).map((key) => {
          setVerified(res.data[key]["verified"]);
        });
        if (res.data) {
          Object.keys(res.data).map((key) => {
            setMyGround(res.data[key]);
            setGroundID(key);
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    setSlots(getTimeStops(myGround["openAt"], myGround["closeAt"], 2)); //dividing time into slots and set into state
    if (slots.length > 0)
      setBookingFields({
        ...bookingFields,
        start1: slots[0],
        close1: slots[1],
        start2: slots[1],
        close2: slots[2],
      });
    //checking, if user has created a slot for booking
    isSlot(groundID).then((res) => setCreatedSlot(res.data));
  }, [myGround]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  // function to divide time of range into no of slots
  function getTimeStops(start, end, slots) {
    var startTime = moment(start, "HH:mm");
    var endTime = moment(end, "HH:mm");

    if (endTime.isBefore(startTime)) {
      endTime.add(1, "day");
    }

    var timeStops = [];
    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours();
    console.log("Total hours in this limit is ", hours);

    while (startTime <= endTime) {
      timeStops.push(new moment(startTime).format("HH:mm"));
      startTime.add(hours / slots, "hours");
    }
    return timeStops;
  }

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

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
  } = formFields;
  const { start1, close1, start2, close2, status } = bookingFields;
  const ResetForm = () => {
    window.location.reload();
    setFormFields(defaultFormFields);
    setImageURLs([]);
  };

  const handleBookingSettings = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    // console.log(event.target.value);
    setBookingFields({ ...bookingFields, [name]: value });
  };
  const handleBookingSubmit = (event) => {
    event.preventDefault();

    try {
      if (!isSlotCreated) {
        createBooking({
          groundID: groundID,
          start1: start1,
          close1: close1,
          start2: start2,
          close2: close2,
        }).then((res) => console.log(res));
      } else {
        //update slot
      }
    } catch (error) {
      console.log("Error creating booking ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // getting event and attached attributes and destructuring them
    console.log(event.target.value);
    setFormFields({ ...formFields, [name]: value, ownerID: currentUser.uid });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      if (images.length < 1) return;

      let formData = new FormData();
      images.forEach((img) => formData.append("grounds[]", img));
      formData.append("userID", currentUser.uid);

      registerGround(formFields);
      uploadImages(formData);
      ResetForm();
    } catch (error) {
      console.log("Cannot submit data of grounds", error);
    }
  };

  return (
    <div class="card">
      <div class="card-body">
        {noGround ? (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <div class="row align-items-center">
                <div class="col-6">
                  <h6 class="mb-0">No ground yet, Register now!</h6>
                </div>
                <FormInput
                  type={"file"}
                  id="groundImg"
                  style={{ position: "absolute", display: "none" }}
                  accept="image/png, image/jpeg"
                  max={3}
                  min={1}
                  onChange={onImageChange}
                  required
                  multiple
                />

                <div class="col-6 text-end">
                  <label
                    for="groundImg"
                    class="btn btn-sm bg-gradient-primary mb-0"
                  >
                    + ADD IMAGES
                  </label>
                </div>
              </div>
            </div>
            {<Viewer images={imageURLS} />}
            {/* <div class="field">
            <h6 class="heading-small text-muted mb-4">Ground Images</h6>
            <div class="swiper mySwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img
                    src="https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=847&q=80"
                    alt=""
                    class="border-radius-lg"
                    srcset=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="https://images.unsplash.com/photo-1609134545248-1a41853280b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
                    alt=""
                    class="border-radius-lg"
                    srcset=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="https://images.unsplash.com/photo-1580210916128-63922445877f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt=""
                    class="border-radius-lg"
                    srcset=""
                  />
                </div>
                <div class="swiper-slide">
                  <img
                    src="https://images.unsplash.com/photo-1582542021985-549ba224e01b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    alt=""
                    class="border-radius-lg"
                    srcset=""
                  />
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div> */}

            <hr class="horizontal dark my-4" />
            <h6 class="heading-small text-muted mb-4">Ground Information</h6>
            <div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">Name of ground</label>
                    <input
                      type={"hidden"}
                      class="form-control"
                      name="ownerID"
                      value={ownerID}
                      onChange={handleChange}
                      required
                    />
                    <FormInput
                      type="text"
                      class="form-control"
                      placeholder="Type name of your ground"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">Map Address</label>
                    <FormInput
                      type={"url"}
                      class="form-control"
                      placeholder="Copy Address from Map"
                      name="mapAddress"
                      value={mapAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">
                      Select Primary Sports
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select"
                      name="sports"
                      value={sports}
                      onChange={handleChange}
                      required
                    >
                      <option value={""} hidden>
                        E.g Cricket
                      </option>
                      <option value="cricket">Cricket</option>
                      <option value="football">Football</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">City</label>
                    <select
                      class="form-select"
                      aria-label="Default select"
                      name="city"
                      value={city}
                      onChange={handleChange}
                      required
                    >
                      <option value={""} hidden>
                        Select city
                      </option>
                      <option value="islamabad">Islamabad</option>
                      <option value="rawalpindi">Rawalpindi</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">
                      Booking rate (Price)
                    </label>
                    <FormInput
                      type={"number"}
                      class="form-control"
                      placeholder="Enter booking rate"
                      name="bookingRate"
                      value={bookingRate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">Website (Optional)</label>
                    <FormInput
                      type="text"
                      class="form-control"
                      placeholder="Website link, if any"
                      name="website"
                      value={website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <hr class="horizontal dark my-4" />

          <h6 class="heading-small text-muted mb-4">Ground Settings</h6> */}
            <div>
              {/* <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-control-label">Status</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Status eg Open, Close</option>
                    <option value="1">Open</option>
                    <option value="2">Close</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label class="form-control-label" for="select-status">
                    Reason
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="select-status"
                  >
                    <option selected>Select Reason eg Booking, Working</option>
                    <option value="1">Booking</option>
                    <option value="2">Working</option>
                  </select>
                </div>
              </div>
            </div> */}
              <hr class="horizontal dark my-4" />
              <h6 class="text-muted mb-4">Open Hours</h6>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">From</label>
                    <FormInput
                      type="time"
                      class="form-control"
                      name="openAt"
                      value={openAt}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label">To</label>
                    <FormInput
                      type="time"
                      class="form-control"
                      name="closeAt"
                      value={closeAt}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr class="horizontal dark my-4" />

            <h6 class="heading-small text-muted mb-4">About Ground</h6>
            <div>
              <div class="form-group">
                <label class="form-control-label">Description</label>
                <textarea
                  rows="4"
                  class="form-control"
                  placeholder="A few words about ground ..."
                  name="description"
                  value={description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            <div className="text-end">
              <button type="button" class="btn bg-gradient-secondary">
                Reset
              </button>
              &nbsp;&nbsp;
              <button type="submit" class="btn bg-gradient-primary">
                Save changes
              </button>
            </div>
          </form>
        ) : isVerified ? (
          <>
            <div class="row align-items-center">
              <div class="col-6">
                <h6 class="mb-0">Booking Settings</h6>
              </div>

              <div class="col-6 text-end">
                <label class="text-muted">{new Date().toDateString()}</label>
              </div>
            </div>
            <hr class="horizontal dark my-4" />
            <div class="d-flex align-items-center flex-wrap">
              <Calendar onChange={setDate} value={date} />

              <div className="card-body">
                {/* <h6 class="heading-small text-muted mb-4">
                  Availability settings
                </h6> */}

                <form onSubmit={handleBookingSubmit}>
                  <div class="row">
                    <div class="col col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">
                          Set booking status
                        </label>
                        <select
                          class="form-select"
                          aria-label="Default select"
                          name="status"
                          value={status}
                          onChange={handleBookingSettings}
                          required
                        >
                          <option value={""} hidden>
                            Open
                          </option>
                          <option value="open">Open</option>
                          <option value="close">Close</option>
                        </select>
                      </div>
                    </div>
                    {/* <div class="col col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Any reason</label>
                        <select
                          class="form-select"
                          aria-label="Default select"
                          name="sports"
                          value={sports}
                          onChange={handleChange}
                          required
                        >
                          <option value={""} hidden>
                            Booking
                          </option>
                          <option value="open">Booking</option>
                          <option value="close">Close</option>
                        </select>
                      </div>
                    </div> */}
                  </div>

                  <hr class="horizontal dark my-4" />
                  <p class="text-muted mb-4 text-center">
                    Set available timings
                  </p>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">From</label>
                        <FormInput
                          type="time"
                          class="form-control"
                          name="start1"
                          value={start1}
                          onChange={handleBookingSettings}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">To</label>
                        <FormInput
                          type="time"
                          class="form-control"
                          name="close1"
                          value={close1}
                          onChange={handleBookingSettings}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">From</label>
                        <FormInput
                          type="time"
                          class="form-control"
                          name="start2"
                          value={start2}
                          onChange={handleBookingSettings}
                          disabled
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">To</label>
                        <FormInput
                          type="time"
                          class="form-control"
                          name="close2"
                          value={close2}
                          onChange={handleBookingSettings}
                          disabled
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    {/* <button type="button" class="btn bg-gradient-secondary">
                      Reset
                    </button>
                    &nbsp;&nbsp; */}
                    <button
                      type="submit"
                      class="btn bg-gradient-primary w-100"
                      style={{ height: "50px" }}
                    >
                      Create slots
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : isVerified === false ? (
          <div className="text-center pt-6">
            <img src={require("../../assets/img/verified.png")} width="200px" />
            <p className="pt-2 text-center">
              You're all set, it may take a business day
              <br />
              to complete your verification!
            </p>
          </div>
        ) : (
          <FirstLoader />
        )}
      </div>
    </div>
  );
};
export default MyGround;
