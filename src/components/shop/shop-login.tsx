import { Link } from "gatsby";
import React from "react";
import { oneById } from "../../functions/selectors";
import { useImages } from "../contexts/images-provider";
import { GatsbyImage_Interface } from "../interfaces";

import './shop-login.css';

const ShopLogin = ({updateLogged}:ShopLogin_Interface) => {

    const password = "InModeUK";

    const [closeIcon]:[GatsbyImage_Interface, React.Dispatch<GatsbyImage_Interface>] = React.useState(
        useImages().getOne('closeWhiteIcon')
    );

    const submitLog = (e:React.MouseEvent<HTMLButtonElement, MouseEvent> | null = null):void => {
        let _input:HTMLInputElement | any = oneById('shop-login-input');
        if(_input && typeof updateLogged == "function") {
            updateLogged(_input.value == password ? true : false);
        }
    }

    const handleKeyDown = (e:any) => {
        if (e.keyCode === 13) {
            submitLog();
        }
    };

    React.useEffect(() => {
        let _input:HTMLInputElement | any = oneById('shop-login-input');
        if(_input) {
            _input.focus();
        }
    })

    return (
        <div className="shop-login">
            <div className="container" style={{position: "relative"}}>
                <div className="shop-close">
                    {
                        closeIcon.publicURL ?
                        <img src={closeIcon.publicURL} alt="Close" className="background-image"/>:
                        <span>X</span>
                    }
                    <Link to="/" title="Home" className="zone-link"></Link>
                </div>
                <div className="shop-form-log">
                    <h2 className="shop-login-title">Guest Area</h2>
                    <div className="shop-login-subtext">Please enter the password below</div>
                    <input
                        id="shop-login-input"
                        type="password"
                        placeholder="Enter password here..."
                        className="shop-login-input neumorphic"
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        type="submit"
                        className="shop-login-submit neumorphic"
                        onClick={(e) => submitLog(e)}
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ShopLogin_Interface {
    updateLogged(logged:boolean):void;
}

export default ShopLogin;