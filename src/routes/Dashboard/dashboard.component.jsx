import { useState } from "react";
import { useEffect } from "react";
import { getGroundImages } from "../../services/grounds.services";

const Dashboard = () => {
  const [imgURLS, setImgURLS] = useState([]);
  useEffect(() => {
    // getGroundImages("72phNDuBaUXp5Fb5nloga3L44tr2").then((res) =>
    //   setImgURLS(res.data)
    // );
  }, []);

  return (
    <div>
      <p>This is dashboard</p>

      {imgURLS.map((url) => (
        <img src={url} alt="ground image" />
      ))}
    </div>
  );
};
export default Dashboard;
