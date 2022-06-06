import React, { useEffect, useState, Fragment } from "react";

function List() {
	const newURL = "https://assets.breatheco.de/apis/fake/todos/user/"; //la url de nuestra api o el path del servidor donde entra o sale la informacion que queremos
	const [myList, setmyList] = useState([]); // declaramos esta constante para tener nuestra variable que guarda la informacion de la API (myList)
	// y nuestra funcion que cambiara esa variable myList (setmyList) {TODO ESTO SE HACE A TRAVEZ DE UN useState de tipo array []}
	const [pintedList, setPintedList] = useState(""); // declaramos esta constante para tener nuestra variable que RENDERIZA en la pagina las tareas que existen en la API
	// y nuestra funcion que cambiara esa variable (setPintedList) [TODO ESTO SE HACE A TRAVEZ DE UN useState de tipo string ""]
	const [bool, setBool] = useState(true); // cosntante para limpiar los elementos del imput. declaro un booleano para ver el estado del input , si esta ha cambiado que lo ponga limpio

	//primer fetch para cargar los datos
	useEffect(() => {
		fetch(newURL.concat("Ayo107"))
			.then(function (response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function (responseAsJson) {
				setmyList(responseAsJson);
				console.log("JSON", responseAsJson);
			})
			.catch(function (error) {
				"Looks like there was a problem! ", error;
			});
		// si meto la variable myList en el arr se llama constatemente
	}, []);

	// segundo fetch para actualizar los cambios en la Api  METODO PUT
	useEffect(() => {
		console.log("estado :D", myList);
		fetch(newURL.concat("Ayo107"), {
			method: "PUT",
			mode: "cors",
			body: JSON.stringify(myList),
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		})
			.then((res) => res.json())
			.then(function (response) {
				console.log(response);
			});
	}, [bool]);

	//borrar de la lista
	//  guardar en un array temporal
	const deleteList = (indexToDelete) => {
		console.log(myList);
		console.log(indexToDelete);

		const filterDelete = myList.filter((_, index) => {
			console.log(index);
			return index !== indexToDelete;
		});
		console.log(filterDelete);
		setmyList(filterDelete);
		setBool(!bool);
		return;
	};

	// mapeo de la lista de datos
	useEffect(() => {
		setPintedList(
			myList.map((element, index) => {
				return (
					// element.done no lo muestra por que es un bolean y no muestra eso pinta txt
					<li key={index.toString()}>
						{element.label}
						<button
							onClick={(event) => {
								{
									event.preventDefault();

									deleteList(index);
								}
							}}>
							✐
						</button>
					</li>
				);
			})
		);
	}, [myList]);
	return (
		<div className="card container">
			<div className="my-3">
				<input
					type="text"
					placeholder="Nueva Tarea ✏"
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							setmyList([
								...myList,
								{ label: event.target.value, done: false },
							]);
							setBool(!bool);
							event.target.value = "";
						}
					}}
				/>
			</div>

			<div className="card-body">
				<h5 className="card-title">Cosas para hacer 🗒:</h5>
				<div className="print">{pintedList}</div>
			</div>
		</div>
	);
}
export default List;
