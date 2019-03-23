import React, {Component} from 'react';
import highlight_img from '../Assets/fifalafel.jpg';
import '../styles/Highlight.scss';

export default class Header extends Component {
    render() {
        return (
            <article>
                <img src={highlight_img} alt="highlights"/>
                <h1>Delightful Experience</h1>
                <p>an article </p>
            </article>
        )
        
        
        
    }
}