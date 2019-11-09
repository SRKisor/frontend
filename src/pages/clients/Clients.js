import React, { useState, useEffect } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";

// components
import PageTitle from "../../components/PageTitle";

const columns = [
	{
		name: "Name",
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: "Email",
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: "Telephone",
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: "Address",
		options: {
			filter: false,
			sort: true
		}
	}
];

const dataTableData = [];

export default function Clients() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/clients/")
			.then(res => {
				res.data.map(item => {
					var temp = [];

					temp[0] = item.name;
					temp[1] = item.email;
					temp[2] = item.telephone;
					temp[3] = item.address;

					dataTableData.push(temp);
				});
				setIsLoading(false);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<>
			<PageTitle title="Clients" />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					{isLoading ? (
						<LinearProgress />
					) : (
						<MUIDataTable
							title="Clients"
							data={dataTableData}
							columns={columns}
							options={{
								filterType: "checkbox"
							}}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
}
