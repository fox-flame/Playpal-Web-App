import { useState } from "react";
import FormInput from "../../components/Input/input-field.component";

const defaultFormFields = {
  name: "",
  mapAddress: "",
  sports: "",
  city: "",
  bookingRate: "",
  website: "",
  openAt: "",
  closeAt: "",
  description: "",
};
const MyGround = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
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
  } = formFields;

  const ResetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // getting event and attached attributes and destructuring them
    console.log(event.target.value);
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div class="card">
      <div class="card-body">
        <form encType="multipart/form-data">
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
                min={3}
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
                  <label class="form-control-label">Booking rate (Price)</label>
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
      </div>
    </div>
  );
};
export default MyGround;
