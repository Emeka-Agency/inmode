import { Link } from "gatsby";
import React from "react";

const Newsletter = ({  }:Newsletter) => {
    return (
        <div className="newsletter">
            <div className="container">
                <p>Newsletter</p>
                <h2>Subscribe to our newsletter</h2>
                <a
                    href="https://us15.list-manage.com/contact-form?u=b799a9a69ecc0adb83f6ec99a&form_id=ce32ed8d846e4f4be24edcecea370561"
                    title="Subscribe to our newsletter"
                    target="_blank"
                >
                    Subscribe
                </a>
            </div>
        </div>
    );
};

interface Newsletter {
    
};

export default Newsletter;