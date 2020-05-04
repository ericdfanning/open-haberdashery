import React, { Fragment, useState, useRef, useEffect } from 'react';
import VerticalSlider from './Slider.jsx';
import $ from 'jquery';

export default function Thing({ item, index, updateOnOff, updateValue, children, isMobile }) {
	const [showSlider, updateShowSlider] = useState(false);
	const [longPressed, updateLongPressed] = useState(false);
	const [hasInteraction, updateHasInteraction] = useState(false);
	const [milli, udpateMilli] = useState(0);

	const interactionRef = useRef(hasInteraction);
	const showSliderRef = useRef(showSlider);

	useEffect(() => {
	  interactionRef.current = hasInteraction;
	}, [hasInteraction]);

	useEffect(() => {
	  showSliderRef.current = showSlider;
	}, [showSlider]);

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

		if (Number(Number(newTime - milli).toFixed(3)) >= 0.300 && e.target.id) {
			updateShowSlider(true)
			startSliderTimer()
		} else if (Number(Number(newTime - milli).toFixed(3)) < 0.300) {
			let newState;
			if (state === 0 || state === 'OFF') {
				newState = 'ON'
			} else if (state > 0 || state === 'ON') {
				newState = 'OFF'
			}
			updateOnOff(newState)
		}
		udpateMilli(0);
  }

  const startSliderTimer = () => {
  	setTimeout(() => {
  		if (!interactionRef.current) {
  	  	updateShowSlider(false);
  		}
  	}, 2000)
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
						{(state > 0 || state === 'ON') ? state: 'Off'}
						{showSlider &&
							<div className={`vertical-slider-container vertical-slider-container__${index}`}>
								<VerticalSlider
									update={updateValue}
									state={state}
									updateHasInteraction={updateHasInteraction}
									updateShowSlider={updateShowSlider}
									hasInteraction={hasInteraction}
								/>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}