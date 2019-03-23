import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { pathMatch as path} from 'tough-cookie';
import header_img from '../Assets/Plate_logo.png';
import '../styles/Header.scss';

class Header extends Component {
    render() {
        const path = this.props.location.pathname;
        return (
            <div className="header">
                <nav>
                    <Link to={"/"} className="navbar__logo">
                    <img src= {header_img} alt="header logo"/>
                    </Link>
                    <ul>
                    {path.includes("home") ? 
                    <Link to={"/home"} className="navbar">
                        <li className='chosen'>Home</li>
                    </Link> :
                    <Link to={'/home'} className="navbar">
                        <li className="normal">Home</li>
                    </Link>
                    }
                    {path.includes("myplate") ? 
                    <Link to={'/myplate'} className="navbar">
                        <li className="chosen">MyPlate</li>
                    </Link> :
                    <Link to={'/myplate'} className="navbar">
                        <li className="normal">MyPlate</li>
                    </Link>
                    }
                    {path.includes("inspiration") ? 
                    <Link to={'/inspiration'} className="navbar">
                        <li className="chosen">Inspiration</li>
                    </Link> :
                    <Link to={'/inspiration'} className="navbar">
                        <li className="normal">Inspiration</li>
                    </Link>
                    }
                    </ul>
                </nav>
                <button>Login</button>
            </div>
        )
    }
}

export default withRouter(Header);