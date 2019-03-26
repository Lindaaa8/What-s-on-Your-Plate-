import React, {Component} from 'react';
import highlight_img from '../Assets/fifalafel.jpg';
import '../styles/Highlight.scss';

export default class Header extends Component {
    render() {
        return (
            <article>
                <h1>Food Recognition</h1>
                <h1 className='here'>Nutrition Database</h1>
                <figure className='bowl'>
                    <img src={highlight_img} alt="highlights"/>
                    <div className='bowl__container'>
                        <div className='bowl__content'>
                                <h3>Nutrition Facts for Falafel</h3>
                                <ul>
                                    <li>Kilocalories       333g</li>
                                    <li>Fat                       18g</li>
                                    <li>Carbohydrate        32g</li>
                                    <li>Protein                   13g</li>
                                </ul>
                        </div>
                    </div>
                </figure>
                <h1>Portion Calculation</h1>
                
            </article>
        )
        
        
        
    }
}