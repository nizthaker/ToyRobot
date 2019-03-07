import {shallow} from 'enzyme';
import React from 'react';
import ToyRobot from './ToyRobot';

describe('<ToyRobot/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<ToyRobot/>);
    });

    describe('place robot', () => {
        it('should place robot on table', () => {
            wrapper.find('.placeButton').simulate('click');
            expect(wrapper.state().x).toEqual(0);
            expect(wrapper.state().y).toEqual(0);
            expect(wrapper.state().facing).toEqual(0);
        });
        it('should place robot on user coordinates', () => {
            wrapper.find('.inputX').simulate('change', {target: {value: '1', name: 'inputX'}}, null);
            wrapper.find('.inputY').simulate('change', {target: {value: '1', name: 'inputY'}}, null);
            wrapper.find('.inputFacing').simulate('change', {target: {value: '1', name: 'inputFacing'}}, null);

            wrapper.find('.placeButton').simulate('click');
            expect(wrapper.state().x).toEqual(1);
            expect(wrapper.state().y).toEqual(1);
            expect(wrapper.state().facing).toEqual(1);
        });
        it('should not place robot when user put invalid coordinates', () => {
            wrapper.find('.inputX').simulate('change', {target: {value: '5', name: 'inputX'}}, null);
            wrapper.find('.inputY').simulate('change', {target: {value: '12', name: 'inputY'}}, null);
            wrapper.find('.inputFacing').simulate('change', {target: {value: '3', name: 'inputFacing'}}, null);

            wrapper.find('.placeButton').simulate('click');
            expect(wrapper.state().x).toEqual(null);
            expect(wrapper.state().y).toEqual(null);
            expect(wrapper.state().facing).toEqual(null);
        });
        
    });
    describe('turnings', () => {
        it('should turn left after placing robot on table', () => {
            wrapper.find('.placeButton').simulate('click');
            wrapper.find('.leftButton').simulate('click');
            expect(wrapper.state().facing).toEqual(3);
            wrapper.find('.leftButton').simulate('click');
            expect(wrapper.state().facing).toEqual(2);
            wrapper.find('.leftButton').simulate('click');
            expect(wrapper.state().facing).toEqual(1);
            wrapper.find('.leftButton').simulate('click');
            expect(wrapper.state().facing).toEqual(0);
        });
        it('should not turn left if robot is not placed yet', () => {
            wrapper.find('.leftButton').simulate('click');
            expect(wrapper.state().x).toEqual(null);
            expect(wrapper.state().y).toEqual(null);
            expect(wrapper.state().facing).toEqual(null);
        });
        it('should turn right after placing robot on table', () => {
            wrapper.find('.placeButton').simulate('click');
            wrapper.find('.rightButton').simulate('click');
            expect(wrapper.state().facing).toEqual(1);
            wrapper.find('.rightButton').simulate('click');
            expect(wrapper.state().facing).toEqual(2);
            wrapper.find('.rightButton').simulate('click');
            expect(wrapper.state().facing).toEqual(3);
            wrapper.find('.rightButton').simulate('click');
            expect(wrapper.state().facing).toEqual(0);
        });
        it('should not turn right if robot is not placed yet', () => {
            wrapper.find('.rightButton').simulate('click');
            expect(wrapper.state().x).toEqual(null);
            expect(wrapper.state().y).toEqual(null);
            expect(wrapper.state().facing).toEqual(null);
        });
    });
    describe('moving', () => {
        it('should move west within the table', () => {
            wrapper.find('.placeButton').simulate('click');
            wrapper.setState({
                x: 1,
                y: 2,
                facing: 3,
            })
            wrapper.find('.moveButton').simulate('click');
            expect(wrapper.state().x).toEqual(0);
            expect(wrapper.state().y).toEqual(2);
            expect(wrapper.state().facing).toEqual(3);

        });
        it('should move north within the table', () => {
            wrapper.find('.placeButton').simulate('click');
            wrapper.setState({
                x: 1,
                y: 2,
                facing: 0,
            })
            wrapper.find('.moveButton').simulate('click');
            expect(wrapper.state().x).toEqual(1);
            expect(wrapper.state().y).toEqual(3);
            expect(wrapper.state().facing).toEqual(0);

        });
        it('should move south within the table', () => {
            wrapper.find('.placeButton').simulate('click');
            wrapper.setState({
                x: 1,
                y: 2,
                facing: 2,
            })
            wrapper.find('.moveButton').simulate('click');
            expect(wrapper.state().x).toEqual(1);
            expect(wrapper.state().y).toEqual(1);
            expect(wrapper.state().facing).toEqual(2);

        });
        it('should move east within the table', () => {
            wrapper.find('.placeButton').simulate('click');
            wrapper.setState({
                x: 1,
                y: 2,
                facing: 1,
            })
            wrapper.find('.moveButton').simulate('click');
            expect(wrapper.state().x).toEqual(2);
            expect(wrapper.state().y).toEqual(2);
            expect(wrapper.state().facing).toEqual(1);

        });
        it('should not move if robot is on edge of the table,', () => {
            wrapper.find('.placeButton').simulate('click');
            wrapper.setState({
                x: 4,
                y: 2,
                facing: 1,
            })
            wrapper.find('.moveButton').simulate('click');
            expect(wrapper.state().x).toEqual(4);
            expect(wrapper.state().y).toEqual(2);
            expect(wrapper.state().facing).toEqual(1);
        });
        it('should not move if robot is not placed', () => {
            wrapper.find('.moveButton').simulate('click');
            expect(wrapper.state().x).toEqual(null);
            expect(wrapper.state().y).toEqual(null);
            expect(wrapper.state().facing).toEqual(null);
        });
    });
    describe('render', () => {
        it('should display intial message', () => {
            expect(wrapper.find('.displayText').text()).toEqual('Robot is not placed on the table yet.');
        });
        it('should display robot position status', () => {
            wrapper.find('.placeButton').simulate('click');
            expect(wrapper.find('.displayText').text()).toEqual('Robot at 0, 0, NORTH');
        });
        it('should display action buttons', () => {
            expect(wrapper.find('.placeButton').text()).toEqual('Place');
            expect(wrapper.find('.moveButton').text()).toEqual('Move');
            expect(wrapper.find('.leftButton').text()).toEqual('Left');
            expect(wrapper.find('.rightButton').text()).toEqual('Right');
            expect(wrapper.find('.reportButton').text()).toEqual('Report');
        });
        it('should display input text', () => {
            expect(wrapper.exists('.inputX')).toEqual(true);
            expect(wrapper.exists('.inputY')).toEqual(true);
            expect(wrapper.exists('.inputFacing')).toEqual(true);
        });
    });

});

