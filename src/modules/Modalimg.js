import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';


class Modalimg extends Component{
	state = {
		modal : true
	}

	componentDidMount(){
		this.setState({
			name:this.props.data.image_lists[this.props.modal_image_id]['name'],
			description:this.props.data.image_lists[this.props.modal_image_id]['description']
		})
	}

	toggle = () => {
		this.setState({
			modal : !this.state.modal
		});

		if (this.props.modalstatus){
			this.props.modalstatus()
		}
	}

	changeImageName = event =>{
		this.setState({name:event.target.value})
	}

	changeImageDesc = event =>{
		this.setState({description:event.target.value})
	}

	submitData = (event) =>{
		this.props.imageDetailAction({
			id:event.target.id,
			name:this.state.name,
			description:this.state.description
		})

		this.setState({
			modal : !this.state.modal
		});

		if (this.props.modalstatus){
			this.props.modalstatus()
		}
	}

	render(){
		return(
			<Modal isOpen={this.state.modal} toggle={this.toggle} scrollable={true}>
				<ModalHeader toggle={this.toggle}>
					<div className="col-12">
						<input
							placeholder = "Name"
							value={this.state.name}
							style={{border:"none",fontWeight:"bold"}}
							onChange={this.changeImageName}
						/>
					</div>
				</ModalHeader>
				<ModalBody>
					<div className="col-12 pb-3">
						<img width='100%' src={this.props.modal_image}/>
					</div>
					<div className="col-12">
					  	<input
							type="text"
							placeholder = "Description"
							className="col-12"
							style={{border:"none"}}
							value={this.state.description}
							onChange={this.changeImageDesc}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
				  <Button id={this.props.modal_image_id} color = "primary" onClick={this.submitData}>Save</Button>
				</ModalFooter>
			</Modal>
		);
	}
}
export default Modalimg;