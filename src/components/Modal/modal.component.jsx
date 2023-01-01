import { useEffect } from "react";
import { useContext, useState } from "react";
import { Calendar } from "react-calendar";

import { toast } from "react-toastify";
import { GroundContext } from "../../context/grounds.context";
import { UserContext } from "../../context/user.context";
import {
  findGroundByID,
  markAsVerified,
} from "../../services/grounds.services";
import { getAvailableSlots } from "../../services/slots.services";
import FormInput from "../Input/input-field.component";

const Modal = () => {
  const { currentUser } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [gid, setGroundID] = useState();
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    findGroundByID(currentUser.uid).then(async (res) => {
      let key = Object.keys(res.data);
      setGroundID(key[0]);
    });
  }, []);

  useEffect(() => {
    let dte =
      date.getDate().toString() +
      "-" +
      (date.getMonth() + 1).toString() +
      "-" +
      date.getFullYear().toString();
    getAvailableSlots(gid, dte).then((res2) => {
      setSlots(res2.data);
    });
  }, [date]);
  // const { groundsRequest, setRequest } = useContext(GroundContext);
  // const [verifyLoader, setVerifyLoader] = useState();
  // const handlerVerified = (id, type, city) => {
  //   setVerifyLoader(true);
  //   markAsVerified(id, type, city).then((response) => {
  //     console.log("response");
  //     console.log(response);
  //     setVerifyLoader(response.status === 200); //making false to stop loader
  //     closeModal();

  //     setRequest(
  //       groundsRequest.filter((ground) => ground.owner["groundID"] !== id)
  //     );
  //     toast.success("Verified Successfully", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     // setTimeout(window.location.reload(false), 2000);
  //   });
  // };

  // Close modal helper
  // const closeModal = () => {
  //   document.getElementById(`exampleModal${index}`).style.display = "none";
  //   document
  //     .getElementsByClassName("modal-backdrop")[0]
  //     .classList.remove("show");
  //   document.getElementsByClassName("modal-backdrop")[0].style.display = "none";
  //   document.body.classList.remove("modal-open");
  //   document.body.removeAttribute("style");
  // };
  return (
    <div
      className="modal fade"
      id={"exampleModal"}
      tabIndex="-1"
      aria-labelledby={"exampleModalLabel"}
      aria-hidden="true"
      data-backdrop="false"
      style={{ display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={"exampleModalLabel"}>
              New Booking
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: "grey" }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <form>
                <label class="form-control-label">Select date</label>
                <Calendar onChange={setDate} value={date} />

                <label class="form-control-label pt-4">
                  Select Available Slots
                </label>
                <select
                  class="form-select"
                  aria-label="Default select"
                  name="slots"
                  required
                >
                  <option value={""} hidden>
                    E.g Slot 1
                  </option>
                  {slots.map((slot) => (
                    <option value={slot["slotID"]}>
                      {slot["startTime"]
                        ? slot["startTime"] + "-" + slot["closeTime"]
                        : slot["slotID"]}
                    </option>
                  ))}
                </select>
                <label class="form-control-label pt-4">Name of person</label>
                <FormInput
                  type="text"
                  class="form-control"
                  placeholder="Name of person who booked"
                  name="name"
                  required
                />
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bg-gradient-primary"
              data-bs-dismiss=""
            >
              ADD TO BOOKING
            </button>
            {/* {verifyLoader == true ? (
              <button
                type="button"
                className="btn bg-gradient-primary"
                disabled={true}
              >
                <img
                  src={require("../../assets/img/loader2.gif")}
                  alt=""
                  srcset=""
                  width="20px"
                />
              </button>
            ) : (
              <button
                type="button"
                className="btn bg-gradient-primary"
                onClick={() => {
                  handlerVerified(
                    ground.owner["groundID"],
                    ground.sports,
                    ground.city
                  );
                }}
              >
                VERIFY
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
