import React, { Component } from 'react';
import { DIRECTIONS } from '../util/Constants';

export default class ToyRobot extends Component{
   state = {
       x: 0,
       y: 0,
       facing: 0,
   };

   right = () => {
        const { facing } = this.state;
        this.setState({
            facing: (facing + 1) % 4,
        });
    };

    left = () => {
        const { facing } = this.state;
        if(facing === 0) {
            this.setState({
                facing: 3,
            });
        } else {
            this.setState({
                facing: (facing - 1),
            });
        }

    };

    render(){
            const {x,y,facing} = this.state;

        return(
            <div>
                <p>Robot at {x} ,{y}, {DIRECTIONS[facing]} </p>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label>
                                    Place
                                </label>
                                <input type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button>Move</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.left}>Left</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.right}>Right</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button>Report</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        )
    }

}