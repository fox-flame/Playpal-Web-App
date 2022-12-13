import { useState, useEffect, useContext } from "react";
import { getGroundsWithOwner } from "../../services/grounds.services";
import Modal from "../../components/Modal/modal.component";
import { GroundContext } from "../../context/grounds.context";

const GroundsRequests = () => {
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
        console.log(error);
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
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        PlayPals
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Ground Name
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Location
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Date
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groundsRequest.map((ground, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src={ground.owner["myPic"]}
                                className="avatar avatar-sm me-3"
                                alt="user1"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                {ground.owner["name"]}
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                {ground.owner["phoneNumber"]}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">
                            {ground.name}
                          </p>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <a href="" className="text-xs text-secondary mb-0">
                            {ground.location}
                          </a>
                        </td>
                        <td className="align-middle text-center">
                          <span className="text-secondary text-xs font-weight-bold">
                            23/04/18
                          </span>
                        </td>

                        <td classNameName="d-flex justify-content-center align-items-center">
                          <button
                            type="button"
                            className="btn bg-gradient-primary"
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
