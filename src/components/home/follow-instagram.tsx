import React from "react";

const FollowInstagram = ({insta_id}:FollowInstagram) => {

    return (
        <div className="follow-instagram">
            <h2>
                <a href="http://instagram.com/inmodeuk" target="_blank" rel="noreferrer" title="Follow us on Instagram">
                    Follow us on Instagram
                </a>
            </h2>
            <div className="wrapper">
                {[1, 2, 3, 4].map((index:number, key) => {
                    return(
                        <div key={key} className="elem">
                            <img
                                className="background-image"
                                src={`https://back.inmodeuk.emeka.fr/assets/instagram/${index}.jpg`}
                                alt={`insta-${key + 1}`}
                            />
                            <a href="https://www.instagram.com/inmodeaesthetics/" className="zone-link" target="_blank" rel="noreferrer" title="Follow InMode on Instagram"></a>
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