import {Link} from 'react-router-dom'
import {Component} from "react";

export default class Navbar extends Component{

    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/"> Административный модуль</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/brokers" className="nav-link">Брокеры</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/stocks" className="nav-link">Акции</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link">Настройки</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
