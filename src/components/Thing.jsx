import React, { Fragment, useState, useRef, useEffect, useContext } from 'react';
import VerticalSlider from './Slider.jsx';
import { LongPress } from '@tencoder/longpressreact';

export function Thing({ item, index, updateOnOff, updateValue, children, isMobile }) {
	const [hideChildren, setHideChildren] = useState(false);
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

	const onClickDefault = () => {
		console.log('CALL BACK DEFAULT')
		let newState;
		if (state === 0 || state === 'OFF') {
			newState = 'ON'
		} else if (state > 0 || state === 'ON') {
			newState = 'OFF'
		}
		updateOnOff(newState)
	}

	const longPressInteractionElements = () => {
		return (
			<div className={`vertical-slider-container vertical-slider-container__${index}`}>
				<VerticalSlider
					update={updateValue}
					state={state}
				/>
			</div>
		)
	}

	return (
		<div className='card__container'>
			<div className='card'>
				<div className='card__name-command-container'>
					<div className='card__label'>{item.label}</div>
					<div className='card__name'>Name: {item.name}</div>
					<div className='card__type'>Type: {item.type}</div>
					<div className='card__state'>{stateString}</div>
				</div>
				<div className='card__on-off-container'>
					<LongPress 
						pressTime={300}
						inactiveHide={true}
						inactiveHideTime={2000}
						onClickDefault={onClickDefault}
						id={item.name}
						classNames={'card__command on_button'}
						elementOnInteraction={longPressInteractionElements()}
					>
						<div className=''>
						{(state > 0 || state === 'ON') ? state: 'Off'}
						</div>
					</LongPress>
				</div>
			</div>
		</div>
	)
}