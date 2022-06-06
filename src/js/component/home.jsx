import React, { useEffect, useState, Fragment } from "react";
import List from "./list.jsx";

//include images into your bundle

//create your first component
export function Home() {
	return (
		<Fragment>
			<div className="text-center mt-5">
				<List />
			</div>
		</Fragment>
	);
}
