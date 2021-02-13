import React ,{Component} from 'react';
import JobCard from './../jobCard/JobCard'
import axios from 'axios';
import {Link} from 'react-router-dom';

class Landing extends Component{
	constructor(){
		super();
		this.state={
			allActiveJobs:[]
		}
	}
	componentDidMount(){
		let allActiveJobs=[]
		axios.get('http://localhost:5000/api/jobs/alljobs')
		.then(res=>{
			console.log(res.data[0])
			let jobs = res.data.length
				for(let i=0;i<jobs;i++){
					if(res.data[i].status === 'Active'){
						allActiveJobs.push(res.data[i])
					}
				}
				this.setState({allActiveJobs:allActiveJobs})
			})
		.catch(err=>console.log(err));
	}
	render(){
		return(
		<div className="landing">
		    <div className="dark-overlay landing-inner text-light">
		      <div className="container">
		        <div className="row">
		          <div className="col-md-12 text-center">
		            <h1 className="display-3 mb-4">Rozgar Info
		            </h1>
		            <div style={{textAlign:"center"}}>
		            {
			            this.state.allActiveJobs.map((job,index)=>(
			            	<div id ={index}>
		            			<JobCard 
		            			job = {job}
		            			/>
			            	</div>
			            ))

		            }
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		  )
	}
}

export default Landing;