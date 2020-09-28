import React from "react"
import Flickity from "react-flickity-component";

const AddonClinicalStudies = ({ datas }) => {

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
        autoPlay: 8000,
        wrapAround: true
    });

    console.log(datas);

    if(!datas) {
        return false;
    }

    return (
        <div id="studies" className="addon-clinical-studies">
            <div className="title">
                études cliniques
            </div>
            <div className="clinical-studies-slider">
                <Flickity
                    id={`carousel-clinical-studies`}
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate={true} // default false
                    static // default false
                    className="slide-studies transition"
                >
                    {datas.map((study, key) => {
                        return (
                            <div key={key} className="study-slide">
                                <div className="study-img">
                                    <img
                                        src={study.image.publicURL}
                                        alt="clinical-study"
                                    />
                                </div>
                                <div className="study-text">
                                    <div className="study-name">{study.title}</div>
                                    <div className="study-details">{study.description}</div>
                                    <div className="study-download">
                                        Télécharger
                                        <a className="zone-link" href={study.url} download/>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Flickity>
            </div>
        </div>
    );
}

AddonClinicalStudies.defaultProps = {

}

AddonClinicalStudies.propTypes = {

}

export default AddonClinicalStudies;