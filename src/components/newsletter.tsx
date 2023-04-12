import { Link } from "gatsby";
import React from "react";

const Newsletter = ({  }:Newsletter) => {

    const subscribe_link = "https://us15.list-manage.com/contact-form?u=b799a9a69ecc0adb83f6ec99a&form_id=ce32ed8d846e4f4be24edcecea370561";

    return (
        <div className="newsletter">
            <div className="container">
                <h2><a href={subscribe_link} target="_blank" className="newsletter-subscribe_title-link">Subscribe to our</a> newsletter</h2>
                <h6>and receive all our latest news</h6>
                <a
                    href={subscribe_link}
                    className="newsletter-subscribe_button"
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