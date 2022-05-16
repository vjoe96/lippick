import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import "./MakeUp.scss";

function MakeUp(props) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const color = props.color;
    const runFacemesh = async () => {
        const net = await facemesh.load(
            facemesh.SupportedPackages.mediapipeFacemesh
        );
        setTimeout(() => {
            if (
                !(
                    typeof webcamRef.current !== "undefined" &&
                    webcamRef.current !== null &&
                    webcamRef.current.video.readyState === 4
                )
            ) {
                alert("사용 가능한 캠이 없습니다.");
                props.setTryOn(!props.tryOn);

                return;
            }
        }, 3000);
        setInterval(() => {
            detect(net, color);
        }, 750);

        const detect = async (net, color) => {
            if (
                typeof webcamRef.current !== "undefined" &&
                webcamRef.current !== null &&
                webcamRef.current.video.readyState === 4
            ) {
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;

                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;

                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;

                const face = await net.estimateFaces({ input: video });

                const ctx = canvasRef.current.getContext("2d");

                requestAnimationFrame(() => {
                    drawMesh(face, ctx, color);
                });
            }
        };
    };
    const drawMesh = (predictions, ctx, color) => {
        if (predictions.length > 0) {
            predictions.forEach((prediction) => {
                const keypoints1 = prediction.annotations.lipsLowerOuter;
                const keypoints2 = prediction.annotations.lipsLowerInner;
                const keypoints3 = prediction.annotations.lipsUpperOuter;
                const keypoints4 = prediction.annotations.lipsUpperInner;
                let i;
                ctx.beginPath();
                ctx.moveTo(keypoints1[0][0], keypoints1[0][1]);
                for (i = 1; i < keypoints1.length - 1; i++) {
                    ctx.lineTo(keypoints1[i][0], keypoints1[i][1]);
                }

                for (i = keypoints2.length - 1; i >= 0; i--) {
                    ctx.lineTo(keypoints2[i][0], keypoints2[i][1]);
                }
                ctx.lineTo(keypoints1[0][0], keypoints1[0][1]);
                ctx.moveTo(keypoints3[0][0], keypoints3[0][1]);

                for (i = 1; i < keypoints3.length - 1; i++) {
                    ctx.lineTo(keypoints3[i][0], keypoints3[i][1]);
                }
                for (i = keypoints4.length - 1; i >= 0; i--) {
                    ctx.lineTo(keypoints4[i][0], keypoints4[i][1]);
                }
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.7;
                ctx.fill();
            });
        }
    };
    useEffect(() => {
        runFacemesh();
    }, []);
    return (
        <div className="makeup-wrap">
            <div className="cam-wrap">
                <Webcam ref={webcamRef} className="cam" />
            </div>
            <div className="canvas-wrap">
                <canvas ref={canvasRef} className="canvas" />
            </div>
        </div>
    );
}
export default MakeUp;
