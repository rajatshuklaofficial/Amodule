import React from 'react';
import './style.css'




const JobCard = (props) =>{
	console.log(props)
	return(
		<div className = 'card'>
			<div className='jobTitle'>{props.job.title}</div>
			<div>Company: {props.job.company}</div>
			<div>Location: {props.job.location} </div>
			<div>Description: {props.job.description}</div>
		</div>
		)
}
export default JobCard;