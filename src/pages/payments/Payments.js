import React, { useState, useEffect } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import moment from "moment";

// components
import PageTitle from "../../components/PageTitle";

const columns = [
	{
		name: "ID",
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: "Payment Method",
		options: {
			filter: true,
			sort: true
		}
	},
	{
		name: "Amount",
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: "Payment Type",
		options: {
			filter: true,
			sort: true
		}
	},
	{
		name: "Date",
		options: {
			filter: false,
			sort: true
		}
	},
	{
		name: "Due Date",
		options: {
			filter: false,
			sort: true
		}
	}
];

const dataTableData = [];

export default function Payments() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/payments/")
			.then(res => {
				res.data.map(item => {
					var temp = [];

					temp[0] = item.id_;
					temp[1] = item.payment_methods_name;
					temp[2] = item.amount;
					temp[3] = item.payment_types_name;
					temp[4] = moment(item.date).format("YYYY-MM-DD");
					temp[5] = moment(item.due_date).format("YYYY-MM-DD");

					dataTableData.push(temp);
				});
				setIsLoading(false);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<>
			<PageTitle title="Payments" />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					{isLoading ? (
						<LinearProgress />
					) : (
						<MUIDataTable
							title="Payments"
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
