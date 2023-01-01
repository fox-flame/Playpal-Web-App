import { useState } from "react";
import { useEffect } from "react";
import {
  findGroundByID,
  getGroundImages,
} from "../../services/grounds.services";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import markerPlaypal from "../../components/Marker/Icon";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { getUserByID } from "../../services/user.services";

const Dashboard = () => {
  const [imgURLS, setImgURLS] = useState([]);
  const [userDetails, setUser] = useState({});
  const [lat, setLat] = useState(51.505);
  const [long, setLong] = useState(-0.09);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    findGroundByID(currentUser.uid).then(async (res) => {
      let gid = Object.keys(res.data);
      setLat(res.data[gid[0]]["lat"]);
      setLong(res.data[gid[0]]["lon"]);
      console.log(gid[0]);
      await getUserByID(currentUser.uid).then((res2) => {
        setUser(res2.data);
      });
      // await getGroundImages(currentUser.uid).then((res2) => {
      //   console.log(res2.data);
      //   setImgURLS(res2.data);
      // });
    });
  }, []);

  const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
  };

  return (
    // <div>
    //   <p>This is dashboard</p>

    //   {imgURLS.map((url) => (
    //     <img src={url} alt="ground image" />
    //   ))}
    // </div>

    <>
      <div class="container-fluid">
        <div
          class="page-header min-height-200 border-radius-xl mt-4"
          style={{
            backgroundImage: require("../../assets/img/curved-images/curved0.jpg"),
            backgroundPositionY: "50%",
          }}
        >
          <span class="mask bg-gradient-primary opacity-6"></span>
        </div>
        <div
          class="blur shadow-blur mx-4 mt-n6 overflow-hidden"
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "10px",
          }}
        >
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src={require("../../assets/img/dp.png")}
                  alt="profile_image"
                  class="w-100 border-radius-lg shadow-sm"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">{userDetails["displayName"]}</h5>
                <p class="mb-0 font-weight-bold text-sm">Ground Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-0">Gallery</h6>
            </div>
            <br />
            <div
              style={{
                width: "100%",
              }}
              className="p-3"
            >
              <img
                src={
                  imgURLS.length > 0
                    ? imgURLS[0]
                    : require("../../assets/img/curved-images/curved-6.jpg")
                }
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </div>
            <div className="d-flex">
              <div
                style={{
                  width: "100%",
                }}
                className="p-3"
              >
                <img
                  src={
                    imgURLS.length > 1
                      ? imgURLS[1]
                      : require("../../assets/img/curved-images/curved-6.jpg")
                  }
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                }}
                className="p-3"
              >
                <img
                  src={
                    imgURLS.length > 2
                      ? imgURLS[2]
                      : require("../../assets/img/curved-images/curved-6.jpg")
                  }
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-md-8 d-flex align-items-center">
                  <h6 class="mb-0">Profile Information</h6>
                </div>
                <div class="col-md-4 text-end">
                  <a href="javascript:;">
                    <i
                      class="fas fa-user-edit text-secondary text-sm"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Edit Profile"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body p-3">
              <p class="text-sm">
                Hi, I’m {userDetails["displayName"]} , this is the dashboard
                page containing my gallery and information
              </p>
              <hr class="horizontal gray-light my-4" />
              <ul class="list-group">
                <li class="list-group-item border-0 ps-0 pt-0 text-sm">
                  <strong class="text-dark">Full Name:</strong> &nbsp;
                  {userDetails["displayName"]}
                </li>
                <li class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark">Mobile:</strong> &nbsp;
                  {userDetails["phoneNumber"]}
                </li>
                <li class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark">Email:</strong> &nbsp;
                  {userDetails["email"]}
                </li>
                <li class="list-group-item border-0 ps-0 text-sm">
                  <strong class="text-dark">Location:</strong> &nbsp; Islamabad,
                  Pakistan
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-4">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-0">Ground Location</h6>
              <MapContainer
                center={[lat, long]}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                  height: "400px",
                  width: "100%",
                  backgroundColor: "red",
                  marginTop: "10px",
                  marginBottom: "90px",
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={markerPlaypal} position={[lat, long]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                <RecenterAutomatically lat={lat} lng={long} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
