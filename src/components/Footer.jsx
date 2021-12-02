import React from 'react'
import { Link } from 'react-router-dom';
import Button from './Button'
import { useWebContext } from './Context/WebContext'
import favicon from '../images/favicon.svg';
import ContactImage from '../images/contact.svg'
import FeedbackImage from '../images/feedback.svg'

const Footer = () => {
    const { theme } = useWebContext();
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="footer-left-image">
                    <img className="footer-left-image__img" src={favicon} alt="planner" />
                </div>
            </div>
            <div className="footer-center">
                <p className="footer-center__p">&copy; 2021 Planner</p>
                <p className="footer-center__p">Made by: Akshat Mittal</p>
            </div>
            <div className="footer-right">
                <Button
                    text={
                        <Link to='/contact'>
                            Contact Us
                        </Link>
                    }
                    variant={theme === "light" ? "outline" : "fill"}
                    className="footer-button"
                    imgSrc={ContactImage}
                    imgAlt="Contact Us"
                    color="blue"
                />
                <Button
                    text={
                        <Link to='/feedback'>
                            Send Us a Feedback
                        </Link>
                    }
                    variant={theme === "light" ? "outline" : "fill"}
                    className="footer-button"
                    imgSrc={FeedbackImage}
                    imgAlt="Feedback"
                    color="green"
                />
            </div>
        </footer>
    )
}

export default Footer
