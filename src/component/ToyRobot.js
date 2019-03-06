import React, { Component } from 'react';
import { DIRECTIONS } from '../util/Constants';

export default class ToyRobot extends Component{
    // setting an initial state
   state = {
       x: null,
       y: null,
       facing: null,
       inputX: 0,
       inputY: 0,
       inputFacing: 0,
   };

   isPlaced = () => {
       const {x } = this.state;
       if(x === null ){
           alert("Please place the robot on the table.");
           return false;
       }
       return true;
   }

   right = () => {
        const {facing } = this.state;
        if(!this.isPlaced() ){
            return false;
        }
        this.setState({
            facing: (facing + 1) % 4,
        });
    };

    left = () => {
        const { facing } = this.state;
        if(!this.isPlaced() ){
            return false;
        }
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

    validPosition = (x, y) => {
        const pattern = new RegExp("^[0-4]$");
        if(!pattern.test(x) || !pattern.test(y))
        {
            return false;
        }
            return true;
    }

    report = () => {
        const { x, y, facing } = this.state;
        if(!this.isPlaced() ){
            return false;
        }
        alert(x + "," + y + "," + DIRECTIONS[facing])
    }


    move = () => {
       const { x, y, facing } = this.state;
        if(!this.isPlaced() ){
            return false;
        }
       let newY = y;
       let newX = x;
       switch(facing) {
           case 0:
           {
               newY = y+1;
               break;
           }
           case 1:
           {
               newX = x + 1;
               break;
           }
           case 2:
           {
               newY = y - 1;
               break;
           }
           case 3:
           {
               newX = x - 1;
               break;
           }

       }
       if(this.validPosition(newX,newY)) {
           this.setState({
               x: newX,
               y: newY,
           })
       }
    }

    place = () => {
        const { inputX, inputY, inputFacing } = this.state;
            if(this.validPosition(inputX, inputY)) {
                this.setState({
                    x: parseInt(inputX),
                    y: parseInt(inputY),
                    facing: parseInt(inputFacing),
                })
            } else {
                alert("Please provide valid coordinates.")
            }
    }

    changeHandler = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)

    }

    render(){
            const {x,y,facing, inputX, inputY, inputFacing} = this.state;
            const displayText = x === null ? "Robot is not placed on the table yet." : `Robot at ${x}, ${y}, ${DIRECTIONS[facing]}`;

        return(
            <div>
                <p className="displayText">{displayText}</p>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <button className="placeButton" onClick={this.place}>Place</button>
                                <input className="inputX" type="number"  name="inputX" placeholder="X" value={inputX} onChange={this.changeHandler} />
                                <input className="inputY" type="number" name="inputY" placeholder="Y" value={inputY} onChange={this.changeHandler}/>
                                <select className="inputFacing" name="inputFacing"  onChange={this.changeHandler} value={inputFacing}>
                                    {DIRECTIONS.map((d, i) => {
                                        return <option key={i} value={i}>{d}</option>
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="moveButton" onClick={this.move}>Move</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="leftButton" onClick={this.left}>Left</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="rightButton" onClick={this.right}>Right</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="reportButton" onClick={this.report}>Report</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

            </div>
        )
    }

}