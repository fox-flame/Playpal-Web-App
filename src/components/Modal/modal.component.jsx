import { useContext, useState } from "react";

import { toast } from "react-toastify";
import { GroundContext } from "../../context/grounds.context";
import {
  markAsVerified,
  markAsRejected,
} from "../../services/grounds.services";

const Modal = ({ index, ground }) => {
  const { groundsRequest, setRequest } = useContext(GroundContext);
  const [verifyLoader, setVerifyLoader] = useState();
  const handlerVerified = (id, type, city) => {
    setVerifyLoader(true);
    markAsVerified(id, type, city).then((response) => {
      setVerifyLoader(response.status === 200); //making false to stop loader
      closeModal();

      setRequest(
        groundsRequest.filter((ground) => ground.owner["groundID"] !== id)
      );
      toast.success("Verified Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // setTimeout(window.location.reload(false), 2000);
    });
  };

  // Close modal helper
  const closeModal = () => {
    document.getElementById(`exampleModal${index}`).style.display = "none";
    document
      .getElementsByclassName("modal-backdrop")[0]
      .classList.remove("show");
    document.getElementsByclassName("modal-backdrop")[0].style.display = "none";
    document.body.classList.remove("modal-open");
    document.body.removeAttribute("style");
  };
  return (
    <div
      className="modal fade"
      id={"exampleModal" + index}
      tabIndex="-1"
      aria-labelledby={"exampleModalLabel" + index}
      aria-hidden="true"
      data-backdrop="false"
      style={{ display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={"exampleModalLabel" + index}>
              Ground Verification
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex px-2 py-1">
                <div>
                  <img
                    src={ground.owner["myPic"]}
                    className="avatar avatar-sm me-3"
                    alt="user1"
                  />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h6 className="mb-0 text-sm">{ground.owner["name"]}</h6>
                  <p className="text-xs text-secondary mb-0">
                    {ground.owner["phoneNumber"]}
                  </p>
                </div>
              </div>

              <div>
                <a href={"tel:" + ground.owner["phoneNumber"]}>
                  <img src={require("../../assets/img/call-icon.png")} alt="" />
                </a>
              </div>
            </div>

            <div className="d-flex px-2 py-1 justify-content-between mt-4 border border-2 rounded">
              <div className="d-flex flex-column justify-content-center">
                <p className="mb-0 text-sm">Click to view Location</p>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <a
                  href="https://www.google.com/maps/dir/33.7146256,73.0759443/Rawalpindi+cricket+stadium+map/@33.6844265,73.0311983,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x38df95ca303fb4ab:0x36a43fbd8951b83b!2m2!1d73.0760641!2d33.6515516"
                  target="_blank"
                  className="text-xs text-secondary mb-0"
                >
                  Islamabad, H12
                </a>
              </div>
            </div>

            <h6 className="mb-2 mt-4">{ground.name}</h6>

            <div className="d-flex px-2 py-1 justify-content-between mt-4">
              <div className="d-flex flex-column justify-content-center">
                <p className="mb-0 text-sm">Ground Size</p>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <p className="text-xs text-secondary mb-0">10000</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bg-gradient-secondary"
              data-bs-dismiss=""
            >
              REJECT
            </button>
            {verifyLoader == true ? (
              <button type="button" className="btn bg-gradient-primary">
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
                    ground.type,
                    ground.city
                  );
                }}
              >
                VERIFY
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
