import React from "react";
import { DropdownList } from "react-widgets";

export default ({
	input,
	label,
	data,
	valueField,
	textField,
	meta: { error, touched }
}) => {
	return (
		<div>
			<label>{label}</label>
			<DropdownList
				{...input}
				data={data}
				valueField={valueField}
				textField={textField}
				onChange={input.onChange}
				style={{ marginBottom: '5px' }}
			/>
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};