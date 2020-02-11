import React, { Component } from 'react';
import { 
	TabContent, 
	TabPane, 
	Nav, 
	NavItem, 
	NavLink
} from 'reactstrap';
import classnames from 'classnames';
import Modalimg from './Modalimg';

class Modules extends Component {
	state ={
		activeTab : '1',
		modal : false,
    	items: Array(15).fill()
	}

	componentWillMount(){
		this.loadItems()
	}

	componentWillReceiveProps(){
		this.loadItems()
	}

	toggle = (tab) =>{
		if(this.state.activeTab !== tab){	
			this.setState({
				activeTab : tab
			})
		}
	}
	loadItems = () => {
		let image_list = {1:[],2:[],3:[]}
		let image_list_wdata = {1:[],2:[],3:[]}
		let di = 0
		this.state.items.map((v, i) => {
			// let index = Math.floor(Math.random() * 22) + 1 
			let height = i % 2 === 0 ? "100%" : 400;
			image_list[(di % 3) + 1].push(
					<div key={"div"+i} className="mb-2 hover-class">
						<img key={i+"jpg"} id={i + 1 +"jpg"} height={`${height}`} width='100%' src={`${this.props.data.image_lists[i + 1 +"jpg"]['src']}`} onClick = {(e) => this.handleClick(e)}/>
					</div>
				)
			image_list_wdata[(di % 3) + 1].push(
					<div key={"div"+i} className="mb-2  hover-class">
						<img key={i+"jpg"} id={i + 1 +"jpg"} height={`${height}`} width='100%' src={`${this.props.data.image_lists[i + 1 +"jpg"]['src']}`}/>
						<div className="des">
						<h4 className="head">{`${this.props.data.image_lists[i + 1 +"jpg"]['name']}`}</h4>
						<pre className="sub-head">
							{`${this.props.data.image_lists[i + 1 +"jpg"]['description']}`}
						</pre>
						</div>
					</div>
				)
			di += 1
		})

		this.setState({image_list:image_list,image_list_wdata:image_list_wdata})
	}

	handleClick = (event) => {
		this.setState({
			modal : !this.state.modal,
			modal_image: event && event.target && event.target.src || '',
			modal_image_id: event && event.target && event.target.id || ''
		});
	}


	render() {
		console.log('props',this.props)
		return (
				<div className="head-tab">
					<Nav tabs>
						<NavItem>
						  <NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => { this.toggle('1'); }}
						  >
							Tab1
						  </NavLink>
						</NavItem>
						<NavItem>
						  <NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => { this.toggle('2'); }}
						  >
							Tab2
						  </NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<div className="conainer-fluid img-cover">
								<div className="row text-center pl-2 pr-2">
									<div className="col-lg-4 col-4 p-2">
										{
											this.state.image_list[1]
										}
									</div>
									<div className="col-lg-4 col-4 p-2">
										{
											this.state.image_list[2]
										}
									</div>
									<div className="col-lg-4 col-4 p-2">
										{
											this.state.image_list[3]
										}
									</div>
								</div>
							</div>
						</TabPane>
						<TabPane tabId="2">
							<div className="row text-center pl-2 pr-2">
									<div className="col-lg-4 col-4 p-2">
										{
											this.state.image_list_wdata[1]
										}
									</div>
									<div className="col-lg-4 col-4 p-2">
										{
											this.state.image_list_wdata[2]
										}
									</div>
									<div className="col-lg-4 col-4 p-2">
										{
											this.state.image_list_wdata[3]
										}
									</div>
								</div>
						</TabPane>
					 </TabContent>	
					 {this.state.modal ? 
					 	<Modalimg
					 		{...this.props}
					 		modalstatus = {() => {this.handleClick()}}
					 		modal_image = {this.state.modal_image}
					 		modal_image_id = {this.state.modal_image_id}
					 	/> 
					 	: null}
				</div>

		)
	}
}

export default Modules