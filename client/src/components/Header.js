import {Link} from "react-router-dom";


const Header = (props) => {

    const{titleText, subText, link, linkText} = props;

    return (
        <header>

            <h1>{titleText}</h1>

            <h4>{subText}</h4>

            <Link to={link}
            style = {{color: "blue"}}
            >{linkText}</Link>
        </header>
    )
};

export default Header;