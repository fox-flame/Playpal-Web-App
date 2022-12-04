const FirstLoader = () => {
  return (
    <div
      className="text-center"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <img src={require("../../assets/img/loader.gif")} />
      <p>Hold on..</p>
    </div>
  );
};
export default FirstLoader;
