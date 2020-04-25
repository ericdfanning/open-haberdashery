import React, { Fragment, useState } from 'react';
import InputSlider from './Slider.jsx';
import $ from 'jquery';

export default function Thing({ item, index, updateOnOff, updateValue, children, isMobile }) {
	const [showSlider, updateShowSlider] = useState(false);
	const [longPressed, updateLongPressed] = useState(false);
	const [checkingLongPress, udpateCheckingLongPress] = useState(false);
	const [mousePress, udpateMousePress] = useState(false);
	const [touchPress, udpateTouchPress] = useState(false);
	const [milli, udpateMilli] = useState(0);
	let buttonPressTimer;
	let state = item.state;
	let stateString = `State: ${state}`;
	if (item.type === 'Dimmer') {
		state = Number(Number(state).toFixed(2));
		if (Number(item.state) === 0) {
			stateString = 'State: OFF';
		} else {
			stateString = `Brightness: ${state}%`;
		}
	}
	let count = 0;

	const checkLongPress = () => {
		console.log('setting long press')
		count = 1;
		// updateLongPressed(true)
	}
	const handleButtonPress = (e) =>{
		// console.log('TOUCH PRESS', longPressed, e.target.id, 'date stamp:', `${date.getSeconds() + Number(date.getMilliseconds()/1000)}`)
		if (isMobile) {
			let date = new Date()
			udpateMilli(date.getSeconds() + Number(date.getMilliseconds()/1000))
		}

 	}
	const handleButtonPressMouse = (e) =>{
		// let date = new Date()
		// console.log('MOUSE PRESS', longPressed, e.target.id, 'data mili:', `${date.getSeconds() + Number(date.getMilliseconds()/1000)}`)
		if (!isMobile) {
			let date = new Date()
			udpateMilli(date.getSeconds() + Number(date.getMilliseconds()/1000))
		}
 	}

	const handleButtonRelease = (e) => {
		e.stopPropagation()
		e.preventDefault()

		let date = new Date()
		let newTime = date.getSeconds() + Number(date.getMilliseconds()/1000);
		console.log('releasing button', Number(newTime - milli).toFixed(3), e.target.id)
		if (Number(Number(newTime - milli).toFixed(3)) > 0.250) {
			updateShowSlider(true)
		} else if (Number(Number(newTime - milli).toFixed(3)) < 0.150) {
			let newState;
			if (state === 0) {
				newState = 'ON'
			} else if (state > 0) {
				newState = 'OFF'
			}
			console.log('what is state', state)
			updateOnOff(newState)
		}
		udpateMilli(0);
  }

	return (
		<div className='card__container'>
			<div key={index} className='card'>
				<div className='card__name-command-container'>
					<div className='card__label'>{item.label}</div>
					<div className='card__name'>Name: {item.name}</div>
					<div className='card__type'>Type: {item.type}</div>
					<div className='card__state'>{stateString}</div>
				</div>
				<div className='card__on-off-container'>
					<div key={index} className='card__command on_button' id={item.name}
						onTouchStart={handleButtonPress}
					  onMouseDown={handleButtonPressMouse} 
					  onMouseUp={handleButtonRelease}
					  onTouchEnd={handleButtonRelease} 
					 >
					{state > 0 ? state: 'Off'}</div>
				</div>
			</div>
			{showSlider && <InputSlider update={updateValue} state={state}/>}
		</div>
	)
}