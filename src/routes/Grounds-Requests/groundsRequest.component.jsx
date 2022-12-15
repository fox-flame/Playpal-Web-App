import { useState, useEffect, useContext } from "react";
import { getGroundsWithOwner } from "../../services/grounds.services";
import { GroundContext } from "../../context/grounds.context";
import { BookingContext } from "../../context/bookings.context";

const BookingsRequests = () => {
  const { groundsRequest, setRequest } = useContext(GroundContext);
  const [notFound, set404] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getGroundsWithOwner()
      .then((response) => {
        setRequest(
          Object.values(response.data).filter(
            (ground) => ground["verified"] === false //filtered only non-verified owners
          )
        );
        setLoading(false);
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
          ) : notFound || groundsRequest.length === 0 ? (
            <div className="m-auto text-center">
              <img src={require("../../assets/img/404.png")} width="200px" />
              <p className="pt-2">Seems like there is no ground request</p>
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
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Price
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groundsRequest.map((ground, index) => (
                      <tr>
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
                              <h6 class="mb-0 text-sm">John Michael</h6>
                              <p class="text-xs text-secondary mb-0">
                                john@google.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">Coach</p>
                          <p class="text-xs text-secondary mb-0">Football</p>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="badge badge-sm bg-gradient-success">
                            Pending
                          </span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">
                            23/04/18
                          </span>
                        </td>
                        <td class="align-middle">
                          <a
                            href="javascript:;"
                            class="font-weight-bold text-sm"
                            data-toggle="tooltip"
                            data-original-title="Edit user"
                          >
                            rs 6000
                          </a>
                        </td>

                        <td>
                          <div class="dropdown">
                            <button
                              class="btn bg-gradient-primary dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                              style=""
                            >
                              <li>
                                <a class="dropdown-item" href="#">
                                  Accept
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Reject
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" href="#">
                                  Remove
                                </a>
                              </li>
                            </ul>
                          </div>
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
export default BookingsRequests;
