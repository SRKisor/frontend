import React, { useState, useEffect } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import axios from "axios";

import { fetchDataIfNeeded } from "../../actions";

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

export default function Distributors() {
    const dispatch = useDispatch();

    dispatch({ type: "SELECT_MENU_ITEM", menuItem: "distributors" });

    dispatch(fetchDataIfNeeded("distributors"));

    const isLoading = useSelector(
        state => state.dataPerMenuItem.distributors.isFetching
    );

    var content = useSelector(state => state.dataPerMenuItem.distributors.content);

    var dataTableData = [];

    content.map(item => {
        var temp = [];

        temp[0] = item.name;
        temp[1] = item.email;
        temp[2] = item.telephone;
        temp[3] = item.address;

        dataTableData.push(temp);
    });

    return (
        <>
            <PageTitle title="Distributors" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    {isLoading ? (
                        <LinearProgress />
                    ) : (
                            <MUIDataTable
                                title="Distributors"
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
