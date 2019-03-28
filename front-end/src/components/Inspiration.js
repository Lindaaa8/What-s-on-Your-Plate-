import React, {Component} from 'react';
import highlight_img from '../Assets/fifalafel.jpg';
import '../styles/Inspiration.scss';

export default class Inspiration extends Component {
    render() {
        return (
            <div className='project'>
                <h1 className='project__title'>What's On Your Plate?</h1>
                <div className='project__idea'>
                    <p className='p1'>Many students and work professionals today have high pressure.
                        Most of the time they eat several kinds of food every day and every week, 
                        what can you do to help them balanced nutritious meals  and have good eating 
                        habits to satisfy daily nutritious needs simply?  Let’s make a plan.
                    </p>
                    <p className='p2'>
                        What's on Your Plate is a food journaling website that keeps a variety of food items and 
                        their nutrition. Having similar kinds of food frustrates customers who would like to have
                        a healthy diet.I created a food navigation app that would help shoppers find what kind 
                        of food they need more quickly. Based on research, we identified user needs and pain 
                        points to create an website called What's On Your Plate.
                    </p>
                </div>
            </div>
            )
        }
}