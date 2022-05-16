import React, { useState } from "react";
import "./HomeMain.scss";
import ReactPlayer from "react-player";
import chanel from "../img/chanel_cut.mp4";
import { connect } from "react-redux";
import MainBottom from "./MainBottom";

function HomeMain(props) {

  
  return (
    <div className="video-wrap">
      <ReactPlayer
        className="react-player"
        url={chanel} // 플레이어 url
        width="100%" // 플레이어 크기 (가로)
        height="100%" // 플레이어 크기 (세로)
        playing={props.playing ? true : false} // 자동 재생 on
        muted={props.muted ? true : false} // 자동 재생 on
        controls={false} // 플레이어 컨트롤 노출 여부
        light={false} // 플레이어 모드
        pip={true} // pip 모드 설정 여부  // 플레이어 초기 포스터 사진
        loop={true}
        volume={null}
        onEnded={() => {}} // 플레이어 끝났을 때 이벤트
      />

      <MainBottom />
    </div>
  );
}

function stateprops(state) {
  return {
    playing: state.reducer3,
    muted: state.reducer4,
  };
}

export default connect(stateprops)(HomeMain);
