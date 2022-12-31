import { useState, useEffect, useContext } from "react";
import {
  findGroundByID,
  getGroundsWithOwner,
  getMyBookings,
} from "../../services/grounds.services";
import { UserContext } from "../../context/user.context";

const MyBookings = () => {
  const { currentUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [isVerified, setVerified] = useState(true);
  const [notFound, set404] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    findGroundByID(currentUser.uid)
      .then(async (res) => {
        let key = Object.keys(res.data);
        let values = Object.values(res.data);
        if (values[0]["verified"] === false) {
          setVerified(false);
          setLoading(false);
        } else {
          await getMyBookings(key).then((res) => {
            setBookings(Object.values(res.data));

            setLoading(false);
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        set404(true);
      });
  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>Grounds Requests</h6>
          </div>
          {loading ? (
            <div className="m-auto text-center">
              <img src={require("../../assets/img/loader.gif")} />
              <p>Hold on..</p>
            </div>
          ) : isVerified === false ? (
            <div className="text-center pt-6">
              <img
                src={require("../../assets/img/verified.png")}
                width="200px"
              />
              <p className="pt-2 text-center">
                You're all set, it may take a business day
                <br />
                to complete your verification!
              </p>
            </div>
          ) : notFound || bookings.length === 0 ? (
            <div className="m-auto text-center">
              <img src={require("../../assets/img/404.png")} width="200px" />
              <p className="pt-2">Seems like there are no Bookings</p>
              {/* <p>Add new booking +</p> */}
            </div>
          ) : (
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        PlayPals
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Role
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Status
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Booking
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((ground, index) => (
                      <tr key={index}>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img
                                src="../assets/img/team-2.jpg"
                                class="avatar avatar-sm me-3"
                                alt="user1"
                              />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">
                                {ground["displayName"]}
                              </h6>
                              <p class="text-xs text-secondary mb-0"></p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">
                            {ground["role"]}
                          </p>
                          {/* <p class="text-xs text-secondary mb-0">Football</p> */}
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="badge badge-sm bg-gradient-success">
                            Pending
                          </span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">
                            {ground["role"]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyBookings;
