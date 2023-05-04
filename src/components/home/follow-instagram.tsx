import React from "react";

const FollowInstagram = ({insta_id}:FollowInstagram) => {

    return (
        <div className="follow-instagram">
            <h2>
                <a href="https://www.instagram.com/inmode.france/?hl=fr" target="_blank" rel="noreferrer" title="Suivez-nous sur Instagram">
                    Suivez-nous sur Instagram
                </a>
            </h2>
            <div className="wrapper">
                {[1, 2, 3, 4].map((index:number, key) => {
                    return(
                        <div key={key} className="elem">
                            <img
                                className="background-image"
                                src={`https://inmodemd.fr/public/instagram/${index}.jpg`}
                                alt={`insta-${key + 1}`}
                            />
                            <a href="https://www.instagram.com/inmodeaesthetics/" className="absolute-link" target="_blank" rel="noreferrer" title="Suivez Inmode sur Instagram"></a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface FollowInstagram {
    insta_id: string | number;
};

export default FollowInstagram;