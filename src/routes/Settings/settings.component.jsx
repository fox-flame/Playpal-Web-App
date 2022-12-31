import { useEffect } from "react";
import FormInput from "../../components/Input/input-field.component";
const Settings = () => {
  return (
    <div className="card">
      <div className="card-body">
        <form encType="multipart/form-data">
          <div>
            <div class="row align-items-center">
              <div class="col-6">
                <h6 class="mb-0">Islamabad Cricket Stadium</h6>
              </div>
            </div>
          </div>
          {/* {<Viewer images={imageURLS} />} */}

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
                    required
                  />
                  <FormInput
                    type="text"
                    class="form-control"
                    placeholder="Type name of your ground"
                    name="name"
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
export default Settings;
