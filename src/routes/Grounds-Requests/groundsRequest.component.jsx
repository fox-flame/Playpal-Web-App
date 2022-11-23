import { useState, useEffect } from "react";
import { getGroundsWithOwner } from "../../services/grounds.services";
import Modal from "../../components/Modal/modal.component";

const GroundsRequests = () => {
  const [grounds, setGrounds] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getGroundsWithOwner().then((response) => {
      setGrounds(
        Object.values(response.data).filter(
          (ground) => ground["verified"] === false //filtered only non-verified owners
        )
      );
      setLoading(false);
    });
  }, []);

  return (
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Grounds Requests</h6>
          </div>
          {loading ? (
            <div className="m-auto">
              <img src={require("../../assets/img/loader.gif")} />
              <p>Hold on..</p>
            </div>
          ) : (
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        PlayPals
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Ground Name
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Location
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Date
                      </th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grounds.map((ground, index) => (
                      <tr key={index}>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img
                                src={ground.owner["myPic"]}
                                class="avatar avatar-sm me-3"
                                alt="user1"
                              />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">
                                {ground.owner["name"]}
                              </h6>
                              <p class="text-xs text-secondary mb-0">
                                {ground.owner["phoneNumber"]}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">
                            {ground.name}
                          </p>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <a href="" class="text-xs text-secondary mb-0">
                            {ground.location}
                          </a>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">
                            23/04/18
                          </span>
                        </td>

                        <td className="d-flex justify-content-center align-items-center">
                          <button
                            type="button"
                            class="btn bg-gradient-primary"
                            data-bs-toggle="modal"
                            data-bs-target={"#exampleModal" + index}
                          >
                            Verify
                          </button>

                          {/*modal*/}
                          <Modal ground={ground} index={index} />
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
export default GroundsRequests;
