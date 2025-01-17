import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import productImage from "../../Components/assets/product.jpg";
import Notification from "../../Components/Notification";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  CardMedia,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import UpdateProduct from "./UpdateProduct";

const useStyles = makeStyles((theme) => ({
  customTitle: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#000000",

    color: theme.palette.common.white,
    textAlign: "center",
  },
}));

function Products() {
  const [user] = useContext(Context);
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        response.data.sort((p1, p2) => {
          if (p1.name < p2.name) {
            return -1;
          } else if (p1.name > p2.name) {
            return 1;
          }

          return 0;
        });
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error({ data: error.response.data, status: error.response.status });
        setIsLoading(false);
      });
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (product) => {
    setEditModalItem(product);
  };
  const handleEditModalClose = () => {
    setEditModalItem(null);
    getData();
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        setNotify({
          isOpen: true,
          message: "Product deleted successfully",
          type: "success",
        });
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "Oops! An error occurred while performing this operation.",
          type: "error",
        });
        console.error({ data: error.response.data, status: error.response.status });
      });
  };

  const formik = useFormik({
    initialValues: {
      name: null,
      price: null,
      weight: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be positive"),
      weight: Yup.number()
        .required("Weight is required")
        .positive("Weight must be positive"),
    }),
    onSubmit: (values, { resetForm }) => {
      let formData = {};

      formData["name"] = values.name;
      formData["price"] = values.price;
      formData["weight"] = values.weight;

      console.log(formData);

      axios
        .post("http://localhost:8080/api/products", formData)
        .then((response) => {
          resetForm();
          handleAddModalClose();
          setNotify({
            isOpen: true,
            message: "Product added successfully",
            type: "success",
          });
          getData();
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Oops! An error occurred while performing this operation.",
            type: "error",
          });
          if (error.response.data.code === "UNIQUE_CONSTRAINT_VIOLATION") {
            formik.setFieldError(error.response.data.field.replace(/_([a-z])/g, g => g[1].toUpperCase()), "This product already exists");
          }
          console.error({ data: error.response.data, status: error.response.status });
        });
    },
  });

  useEffect(() => {
    if (!addModalOpen) {
      formik.resetForm();
    }
  }, [addModalOpen]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="App">
          {user.role === "superadmin" && (
            <Box display="flex" mb={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddModalOpen}
              >
                Add new
              </Button>
            </Box>
          )}

          <Dialog
            open={addModalOpen}
            onClose={handleAddModalClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" className={classes.customTitle}>
              Add a product
            </DialogTitle>
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <div
                  style={{
                    marginTop: "32px",
                    marginBottom: "16px",
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    columnGap: "16px",
                    rowGap: "24px",
                  }}
                >
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    variant="outlined"
                    {...formik.getFieldProps("name")}
                    error={
                      formik.touched.name && formik.errors.name ? true : false
                    }
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    id="price"
                    label="Price"
                    type="number"
                    variant="outlined"
                    {...formik.getFieldProps("price")}
                    error={
                      formik.touched.price && formik.errors.price ? true : false
                    }
                    helperText={formik.touched.price && formik.errors.price}
                  />
                  <TextField
                    id="weight"
                    label="Weight"
                    type="number"
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    {...formik.getFieldProps("weight")}
                    error={
                      formik.touched.weight && formik.errors.weight
                        ? true
                        : false
                    }
                    helperText={formik.touched.weight && formik.errors.weight}
                  />
                </div>

                <DialogActions>
                  <Button
                    variant="outlined"
                    onClick={() => setAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!formik.isValid || !formik.dirty}
                    type="submit"
                    variant="contained"
                  >
                    Add
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>

          <Grid container spacing={6}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardMedia
                    style={{ height: "180px" }}
                    component="img"
                    image={productImage}
                    title="product image"
                  />
                  <CardContent
                    style={{
                      padding: "16px 24px",
                    }}
                  >
                    <Typography
                      gutterBottom
                      style={{ fontWeight: "bold" }}
                      variant="h6"
                      component="h4"
                    >
                      {product.name}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          component="p"
                        >
                          {"Price:"}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {product.price}
                        </Typography>
                      </div>

                      <div>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          component="p"
                        >
                          {"Weight (in quintals):"}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {product.weight}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                  {user.role === "superadmin" && (
                    <CardActions
                      style={{
                        padding: "16px 24px",
                      }}
                    >
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => handleEditModalOpen(product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
          <Notification notify={notify} setNotify={setNotify} />
          <UpdateProduct
            product={editModalItem}
            handleClose={handleEditModalClose}
          />
        </div>
      )}
    </>
  );
}

 export default Products;
