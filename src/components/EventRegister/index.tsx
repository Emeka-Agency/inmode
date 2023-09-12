import React from "react";

import "./index.css";
import { useImages } from "../contexts/images-provider";
import { Airtable_Event_Interface, InmodePanel_Product_Interface } from "../interfaces";
import { graphql, useStaticQuery } from "gatsby";
import LoadingGIF from "../LoadingGIF";
import { handlePromise, resolveImg, resolveImgSet } from "../../functions/tools";
import { _log, _trace } from "../../functions/logger";
import { selectOne } from "../../functions/selectors";
import { useLocalStorage } from "../../functions/use-localstorage";
import { manage_event_register } from "./register";

const EventRegister = ({ event, loading }:EventRegister) => {

    const [products] = React.useState(useStaticQuery(graphql`
        {
            header_left: allStrapiMenu(filter: {container: {eq: "header_top"}, title: {eq: "Products"}}) {
                nodes {
                    products {
                        id
                        position
                        MenuParams {
                            title
                        }
                        Icon {
                            localFile {
                                childImageSharp {
                                    fluid {
                                        srcWebp
                                        srcSetWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `).header_left.nodes[0].products.sort((a:any, b:any) => b.position - a.position));

    const images = useImages();
    const LocalStorage = useLocalStorage;
    const [registered, setRegistered]:[boolean, React.Dispatch<boolean>] = React.useState(false);

    // Name
    // Email
    // Clinic
    // Number
    // Postcode
    // Machines

    return (
        <main id="event-register-page" style={{backgroundImage: `url(${images.resolve_img("bgPattern")})`}}>
            <div id="event-register-bg" style={{backgroundImage: `url(${images.resolve_img("bgPattern")})`}}></div>
            <img id="event-register-logo" src={images.resolve_img("registerEventLogo")} alt="logo" srcSet={images.resolve_img_set("registerEventLogo")} />
            <div id="event-register-container">
                <div id="event-register-content" className={registered ? "registered" : ""}>
                    {loading && <LoadingGIF />}
                    {!loading && !registered && event && 
                        <>
                            <h1>{event?.EventName} - {new Date(event?.Start ?? "now").getFullYear()}</h1>
                            <form onSubmit={(e) => manage_event_register(e, event, setRegistered)}>
                                <label htmlFor="name">Firstname*</label>
                                <input type="text" name="firstname" id="firstname" placeholder="Enter your firstname" required/>
                                <label htmlFor="name">Surname*</label>
                                <input type="text" name="surname" id="surname" placeholder="Enter your surname" required/>
                                <label htmlFor="email">Email*</label>
                                <input type="email" name="email" id="email" placeholder="Enter your email" required/>
                                <label htmlFor="clinic">Clinic*</label>
                                <input type="text" name="clinic" id="clinic" placeholder="Enter your clinic" required/>
                                <label htmlFor="number">Phone number*</label>
                                <input type="tel" name="number" id="number" placeholder="Enter your number" required/>
                                <label htmlFor="postcode">Postcode*</label>
                                <input type="text" name="postcode" id="postcode" placeholder="Enter your postcode" required/>
                                <label htmlFor="comment">Comments</label>
                                <textarea rows={3} name="comment" id="comment" placeholder=""></textarea>
                                {event?.DisplayMachines === "y" && <>
                                    <label htmlFor="machines">Devices interested in</label>
                                    <div id="machines">
                                        {products.map((product:InmodePanel_Product_Interface) => (
                                            <label className="machine" key={product.id} htmlFor={product.MenuParams.title}>
                                                <div className="icon"><img src={resolveImg(product.Icon)} alt={product.MenuParams.title} srcSet={resolveImgSet(product.Icon)}/></div>
                                                <p>{product.MenuParams.title}</p>
                                                <input type="checkbox" name="machines" id={product.MenuParams.title} />
                                            </label>
                                        ))}
                                    </div>
                                </>}
                                <p className="req-return error"></p>
                                <button type="submit">
                                    <span>Submit</span>
                                    <LoadingGIF customId="mini-contact-gif" />
                                </button>
                            </form>
                        </>
                    }
                    {!loading && registered && <>
                        <h1>Thank you for registering</h1>
                        <p>You have successfully registered for the event.</p>
                    </>}
                </div>
            </div>
        </main>
    );
}

interface EventRegister {
    event?: Airtable_Event_Interface;
    loading?: boolean;
};

export default EventRegister;