import React, { useState, useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Button,
  Modal,
  Fade,
  Backdrop,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Pages } from "@material-ui/icons";
import { purple, deepOrange } from "@material-ui/core/colors";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";

import { fetchDataIfNeeded } from "../../actions";

// components
import PageTitle from "../../components/PageTitle";
import Report from "./Report";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 3),
    minWidth: "300px",
    maxWidth: "900px"
  },
  model: {
    top: "50%",
    left: "50%",
    transform: "translate(-50}%, -50%)"
  },
  button: {
    margin: theme.spacing(1)
  },
  card: {
    width: "350px",
    minWidth: "350px",
    margin: "auto"
  }
}));

const columns = [
  {
    name: "Item Code",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Name",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Retail Price",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Quantity",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Wholesale Price",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Manufacture Date",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "Expiration Date",
    options: {
      filter: false,
      sort: true
    }
  }
];

export default function Items() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const dispatch = useDispatch();

  const selectedMenuItem = useSelector(state => state.selectedMenuItem);

  useEffect(() => {
    selectedMenuItem !== "items" &&
      dispatch({ type: "SELECT_MENU_ITEM", menuItem: "items" });
  }, [selectedMenuItem, dispatch]);

  dispatch(fetchDataIfNeeded("items"));

  const isLoading = useSelector(
    state => state.dataPerMenuItem.items.isFetching
  );

  var data = useSelector(state => state.dataPerMenuItem.items.content.data);

  if (!isLoading) {
    var dataTableData = [];
    var count = 0;

    data.map(item => {
      var temp = [];

      temp[0] = item.item_code;
      temp[1] = item.name;
      temp[2] = item.retail_price;
      temp[3] = item.qty;
      temp[4] = item.wholesale_price;
      temp[5] = moment(item.mfd_date).format("YYYY/MM/DD");
      temp[6] = moment(item.exp_date).format("YYYY/MM/DD");

      count++;

      dataTableData.push(temp);
    });
  }

  return (
    <>
      <PageTitle title="Items" />
      <Grid container spacing={4}>
        {!isLoading && (
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignContent="space-around"
            alignItems="center"
            justify="center"
          >
            <>
              <Grid item lg={6}>
                <Card
                  className={classes.card}
                  style={{ backgroundColor: "#4fc3f7", borderRadius: "10px" }}
                >
                  <CardHeader
                    title="Total Item Count"
                    titleTypographyProps={{
                      align: "center",
                      variant: "h2"
                    }}
                    style={{
                      color: "white"
                    }}
                    avatar={
                      <Avatar
                        style={{
                          margin: 10,
                          color: "#fff",
                          backgroundColor: "#76ff03"
                        }}
                      >
                        <Pages />
                      </Avatar>
                    }
                  ></CardHeader>
                  <CardContent
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <Typography
                      variant="h1"
                      component="span"
                      style={{
                        color: "white",
                        backgroundColor: "#4db6ac",
                        padding: "10px",
                        borderRadius: "10px"
                      }}
                    >
                      {count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={6}>
                <Card
                  className={classes.card}
                  style={{ backgroundColor: "#81c784", borderRadius: "10px" }}
                >
                  <CardHeader
                    title="Total Item Count"
                    titleTypographyProps={{
                      align: "center",
                      variant: "h2"
                    }}
                    style={{
                      color: "white"
                    }}
                    avatar={
                      <Avatar
                        style={{
                          margin: 10,
                          color: "#fff",
                          backgroundColor: "#76ff03"
                        }}
                      >
                        <Pages />
                      </Avatar>
                    }
                  ></CardHeader>
                  <CardContent
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <Typography
                      variant="h1"
                      component="span"
                      style={{
                        color: "white",
                        backgroundColor: "#dce775",
                        padding: "10px",
                        borderRadius: "10px"
                      }}
                    >
                      {count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* <Grid item lg="auto">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: "#ffee58", borderRadius: "10px" }}
                >
                  <CardHeader
                    title="Total Item Count"
                    titleTypographyProps={{
                      align: "center",
                      variant: "h2"
                    }}
                    style={{
                      color: "white"
                    }}
                    avatar={
                      <Avatar
                        style={{
                          margin: 10,
                          color: "#fff",
                          backgroundColor: "#76ff03"
                        }}
                      >
                        <Pages />
                      </Avatar>
                    }
                  ></CardHeader>
                  <CardContent
                    style={{
                      textAlign: "center"
                    }}
                  >
                    <Typography
                      variant="h1"
                      component="span"
                      style={{
                        color: "white",
                        backgroundColor: "#ffa726",
                        padding: "10px",
                        borderRadius: "10px"
                      }}
                    >
                      {count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid> */}
            </>
          </Grid>
        )}
        <Grid item xs={12}>
          {!isLoading && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Add
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <MUIDataTable
              title="Items"
              data={dataTableData}
              columns={columns}
              options={{
                filterType: "checkbox"
              }}
              style={{
                minWidth: "500px"
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {!isLoading && (
            <>
              <Card raised={true}>
                <CardHeader
                  title="Item Entered by Date"
                  titleTypographyProps={{
                    align: "center",
                    variant: "h2"
                  }}
                  style={{
                    //   fontStyle=""
                  }}
                />
                <CardContent>
                  <Report />
                </CardContent>
              </Card>
            </>
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 200 }}
      >
        <Fade in={open}>
          <div style={modalStyle} className={classes.paper}>
            <Formik
              initialValues={{
                item_code: "",
                name: "",
                retail_price: "",
                qty: "",
                wholesale_price: "",
                mfd_date: new Date(),
                exp_date: new Date()
              }}
              validationSchema={() => {
                return Yup.object({
                  item_code: Yup.number()
                    .min(1, "Must be a number greater than one")
                    .max(1000000, "Too big. Enter smaller value.")
                    .positive("Should be a positive number.")
                    .integer("Should be a integer.")
                    .required("Required"),
                  name: Yup.string()
                    .max(100, "Must be 100 characters or less")
                    .trim()
                    .lowercase()
                    .required("Required"),
                  retail_price: Yup.number()
                    .min(1, "Must be a number greater than one")
                    .max(1000000, "Too big. Enter smaller value.")
                    .positive("Should be a positive number.")
                    .required("Required"),
                  qty: Yup.number()
                    .min(1, "Must be a number greater than one")
                    .max(1000000, "Too big. Enter smaller value.")
                    .positive("Should be a positive number.")
                    .integer("Should be a integer.")
                    .required("Required"),
                  wholesale_price: Yup.number()
                    .min(1, "Must be a number greater than one")
                    .max(1000000, "Too big. Enter smaller value.")
                    .positive("Should be a positive number.")
                    .integer("Should be a integer.")
                    .required("Required"),
                  mfd_date: Yup.date()
                    .min("2000/01/01")
                    .required("Required"),
                  exp_date: Yup.date()
                    .min("2000/01/01")
                    .when(
                      "mfd_date",
                      (mfd_date, schema) =>
                        mfd_date &&
                        schema.min(
                          mfd_date,
                          "This should be grater than Manufacture Date"
                        )
                    )
                    .required("Required")
                });
              }}
              onSubmit={(values, { setSubmitting }) => {
                axios({
                  method: "post",
                  url: "/items/",
                  data: {
                    item_code: values.item_code,
                    name: values.name,
                    qty: values.qty,
                    retail_price: values.retail_price,
                    wholesale_price: values.wholesale_price,
                    mfd_date: values.mfd_date,
                    exp_date: values.exp_date
                  },
                  headers: { "content-type": "application/json" }
                })
                  .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                      setSubmitting(false);
                      setOpen(false);
                      dispatch({
                        type: "INVALIDATE_MENU_ITEM",
                        menuItem: "items"
                      });
                      dispatch(fetchDataIfNeeded("items"));
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
              render={({ submitForm, isSubmitting }) => (
                <div>
                  <Typography
                    align="center"
                    color="textPrimary"
                    display="block"
                    gutterBottom={true}
                    variant="h1"
                  >
                    Add Item
                  </Typography>
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Field
                          type="number"
                          label="Item Code"
                          name="item_code"
                          component={TextField}
                          fullWidth
                          spacing={20}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          type="text"
                          label="Name"
                          name="name"
                          component={TextField}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          type="number"
                          label="Retail Price"
                          name="retail_price"
                          component={TextField}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          type="number"
                          label="Quantity"
                          name="qty"
                          component={TextField}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          type="number"
                          label="Wholesale Price"
                          name="wholesale_price"
                          component={TextField}
                          fullWidth
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <Field
                          label="Manufacture Date"
                          name="mfd_date"
                          fullWidth
                          component={({ field, form, ...other }) => {
                            const currentError = form.errors[field.name];

                            return (
                              <DatePicker
                                clearable
                                name={field.name}
                                value={field.value}
                                openTo="year"
                                format="YYYY/MM/DD"
                                views={["year", "month", "date"]}
                                // helperText={currentError}
                                // error={Boolean(currentError)}
                                // onError={error => {
                                //   if (error !== currentError) {
                                //     form.setFieldError(field.name, error);
                                //   }
                                // }}
                                onChange={date =>
                                  form.setFieldValue(field.name, date, true)
                                }
                                {...other}
                              />
                            );
                          }}
                        />
                      </Grid>
                      <Grid item sm={6}>
                        <Field
                          label="Expiration Date"
                          name="exp_date"
                          fullWidth
                          component={({ field, form, ...other }) => {
                            const currentError = form.errors[field.name];

                            return (
                              <DatePicker
                                clearable
                                name={field.name}
                                value={field.value}
                                openTo="year"
                                format="YYYY/MM/DD"
                                views={["year", "month", "date"]}
                                helperText={currentError}
                                error={Boolean(currentError)}
                                onError={error => {
                                  if (error !== currentError) {
                                    form.setFieldError(field.name, error);
                                  }
                                }}
                                onChange={date =>
                                  form.setFieldValue(field.name, date._d, true)
                                }
                                {...other}
                              />
                            );
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {isSubmitting && <LinearProgress />}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          onClick={submitForm}
                          classes={classes.button}
                        >
                          Submit
                        </Button>
                        <Button
                          color="primary"
                          className={classes.button}
                          disabled={isSubmitting}
                          onClick={() => setOpen(false)}
                        >
                          Cancle
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </div>
              )}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
