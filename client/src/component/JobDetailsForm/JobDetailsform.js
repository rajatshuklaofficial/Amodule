import React ,{Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



class JobDetailsform extends Component{
	constructor(){
		super();
		this.state={
			Description:'',
			heading:'',
			errors:{}
		}
		this.onChange=this.onChange.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}
	onChange(e){
		this.setState({[e.target.name]:e.target.value});
	}
	onSubmit(e){
		e.preventDefault();

		const newjob={
			heading: this.state.heading,
			Description:this.state.Description
		}
		axios.post('http://localhost:5000/api/users/newjob',newjob)
		.then(res=>console.log(res.data))
		.catch(err=>console.log(err));
	}
	 render(){
	 	return(
	 		<div className="register">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <h1 className="display-4 text-center">Job Details</h1>
			          <form onSubmit={this.onSubmit}>
			            <div className="form-group">
			              <input type="text" className="form-control form-control-lg" placeholder="Heading" name="heading" value={this.state.heading} onChange={this.onChange} required />
			            </div>
			            <div className="form-group">
			              <textarea type="" className="form-control form-control-lg" placeholder="Description" name="Description" value={this.state.Description} onChange={this.onChange} />
			            </div>
			            <input type="submit" className="btn btn-info btn-block mt-4" />
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
	 		)
	 }
}
export default JobDetailsform;