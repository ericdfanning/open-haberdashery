import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import $ from 'jquery';
import Slider from './Slider.jsx';
import Thing from './Thing.jsx';

const filters = {
	usr_xtrr_a: "Exterior Lights ON/OFF",
	usr_etwy_a: "Entryway",
	usr_lvrm_a: "Living Room",
	usr_ktcn_a: "Kitchen",
	usr_isln_a: "Island",
	usr_lndr_a: "Laundry Room",
	usr_bdr1_a: "Master Bedroom",
	usr_br04_a: "Studio",
	usr_rdng_a: "Reading Lights",
	usr_rdDa_a: "Dale's Reading",
	usr_rdMi_a: "Michelle's Reading",
	usr_bdrS_a: "Master Suite ALL OFF",
	usr_bdr2_a: "Guest Bedroom",
	usr_bdr3_a: "Office",
	usr_wc01_a: "Master Bathroom",
	usr_wc02_a: "Guest Bathroom",
	usr_wc03_a: "Powder Room",
}
//curl --header "Content-Type: text/plain" --request POST --data "50" "http://openHABPi.local:8080/rest/items/${id}"

class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			data: [],
			isMobile: false,
			prod: (process.env.NODE_ENV === 'production'),
			devUpdateUrl: `http://192.168.1.65:8888/update`,
			devFetchUrl: `http://192.168.1.65:8888/items`
		}
	}

	componentDidMount() {
		//check to see if device is laptop or phone
		var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    if (x <= 768) {
    	this.setState({isMobile: true})
    } else {
    	this.setState({isMobile: false})
    }
	}

	updateOnOff(id, newState) {//`http://openHABPi.local:8080/rest/items/${id}`
		let prodUrl = `http://openHABPi.local:8080/rest/items/${id}`;
		fetch((this.state.prod ? prodUrl : this.state.devUpdateUrl), {
		  method: "POST",
		  body: `${newState}`,
		  headers: {"Content-Type": "text/plain"}
		}).then((result) => {
		  // console.log('updating')
		  this.getStateFromOpenHab();
		}).catch(function(err) {
			console.log('error posting', err)
		});
	}

	updateValue(id, value) {
		let prodUrl = `http://openHABPi.local:8080/rest/items/${id}`;
		fetch((this.state.prod ? prodUrl : this.state.devUpdateUrl), {
		  method: "POST",
		  body: `${value}`,
		  headers: {"Content-Type": "text/plain"}
		}).then((result) => {
		  // console.log('updating')
		  this.getStateFromOpenHab();
		}).catch(function(err) {
			console.log('error posting', err)
		});
	}

	filterAndSetResult(results) {
		let filteredData = [];
		results.forEach(item => {
			if (filters[item.name]) {
				filteredData.push(item);
			}
		})
		this.setState({ data: filteredData });
		return filteredData;
	}

	getStateFromOpenHab() {
		let prodUrl = `http://openHABPi.local:8080/rest/items`;
		fetch((this.state.prod ? prodUrl : this.state.devFetchUrl))
			.then((response) => {
			  return response.json();
			})
			.then((result) => {
			  this.filterAndSetResult(result);
			})
			.catch(function(err) {
				console.log('error posting', err)
			});
	}

	componentDidMount() {
		this.getStateFromOpenHab();
	}

	render() {
		return (
			<div className='container'>
			{this.state.data && this.state.data.map( (item, index) => {
				return (
					<Thing
						item={item}
						index={index}
						updateOnOff={this.updateOnOff.bind(this, item.name)}
						updateValue={this.updateValue.bind(this, item.name)}
						isMobile={this.state.isMobile}
					/>
				)
			})}
			</div>
		)
	}
}

export default App