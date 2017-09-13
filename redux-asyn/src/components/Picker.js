import React from 'react';

function buildOption(options){
	
	return (
		options.map(function(opt,index){
			return (
				<option 
					value={opt} 
					key={opt}>
					{opt}
				</option>
			);
		})
	);
}

function Picker(props) {
	const {filter,onChange,options} = props;
	return (
		<select
			value={filter}
			onChange={(e)=>{
				onChange(e.target.value);
			}}>
			{buildOption(options)}
		</select>
	);	
}
export default Picker;