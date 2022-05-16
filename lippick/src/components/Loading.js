import React from "react";
import loadingGIF from "../img/loading.gif";

const Loading = () => {
  return (
    <div style={{width:"75%",zIndex:"990",height:"65vh",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
      <img style={{width:"150px",height:"150px"}} src={loadingGIF} alt="" />
    </div>
  );
};

export default Loading;
