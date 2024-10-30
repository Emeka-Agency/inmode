import React from "react";
import { Link } from "gatsby";

import './index.css';

const ExoCoBioTutorial = ({  }:ExoCoBioTutorial) => {

    const vid_1 = "https://inmodemd.fr/public/vids/exb_how_to_1.mp4";
    const vid_2 = "https://inmodemd.fr/public/vids/exb_how_to_2.mp4";

    const [frameOpened, setFrameOpened]:[boolean, React.Dispatch<boolean>] = React.useState(false);

    function display_video_frame(url:string|null = null) {
        try {
            if(typeof url != "string") {return false;}
            document.querySelector('body')?.appendChild(document.createRange().createContextualFragment(`<div id="exb_video_frame"><div id="exb_video_frame-background"></div><div id="exb_video_frame-close">X</div><div id="exb_video_frame-frame"><iframe src="${url}"/></div></div>`));
            document.getElementById('exb_video_frame-background')?.addEventListener('click', (e) => close_video_frame());
            document.getElementById('exb_video_frame-close')?.addEventListener('click', (e) => close_video_frame());
            document.addEventListener('keyup', (e) => e.key == "Escape" && close_video_frame());
            setFrameOpened(true);
            return true;
        }
        catch(error) {
            console.error(error);
            return false;
        }
    }

    function close_video_frame() {
        try {
            document.getElementById('exb_video_frame')?.remove();
            setFrameOpened(false);
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <div id="page_exocobio-tutorial">
            <div id="page_exocobio-tutorial-see">
                <span>VOIR LE TUTORIEL</span>
                <div id="page_exocobio-tutorial-videos">
                    <div id="page_exocobio-tutorial-videos-buttons">
                        <button onClick={() => {frameOpened ? close_video_frame() : display_video_frame(vid_1)}} id="page_exocobio-tutorial-video">Vidéo #1</button>
                        <button onClick={() => {frameOpened ? close_video_frame() : display_video_frame(vid_2)}} id="page_exocobio-tutorial-video">Vidéo #2</button>
                    </div>
                    <div id="page_exocobio-tutorial-videos-arrow"></div>
                </div>
            </div>
        </div>
    );
};

interface ExoCoBioTutorial {

};

export default ExoCoBioTutorial;
