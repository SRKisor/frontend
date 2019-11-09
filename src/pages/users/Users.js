import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
// import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

// const datatableData = [
// 	["Joe James", "Example Inc.", "Yonkers", "NY"],
// 	["John Walsh", "Example Inc.", "Hartford", "CT"],
// 	["Bob Herm", "Example Inc.", "Tampa", "FL"],
// 	["James Houston", "Example Inc.", "Dallas", "TX"],
// 	["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
// 	["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
// 	["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
// 	["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
// 	["Meral Elias", "Example Inc.", "Hartford", "CT"],
// 	["Deep Pau", "Example Inc.", "Yonkers", "NY"],
// 	["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
// 	["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
// 	["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
// 	["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
// 	["Avram Sylva", "Example Inc.", "Hartford", "CT"],
// 	["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
// 	["Gaston Festus", "Example Inc.", "Tampa", "FL"]
// ];

export default function Users() {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			<PageTitle title="Users" />
			<Grid container spacing={4}>
				<Grid item xs={12}>
					{/* <MUIDataTable
						title={
							<Typography variant="title">
								Items
								{isLoading && (
									<CircularProgress
										size={24}
										style={{
											marginLeft: 15,
											position: "relative",
											top: 4
										}}
									/>
								)}
							</Typography>
						}
						data={datatableData}
						columns={["Name", "Company", "City", "State"]}
						options={{
							filterType: "checkbox"
						}}
					/> */}
				</Grid>
			</Grid>
		</>
	);
}
