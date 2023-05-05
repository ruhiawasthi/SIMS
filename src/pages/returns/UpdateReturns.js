import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import * as Yup from "yup";

import { Formik, Form } from "formik";

export const validationSchema = Yup.object().shape({});
const useStyles = makeStyles((theme) => ({
  customTitle: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#000000",

    color: theme.palette.common.white,
    textAlign: "center",
  },
}));

function UpdateEmployee({ employee, roles, handleClose }) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");

  useEffect(() => {
    setName(employee?.employee_name);
    setUsername(employee?.employee_username);
    setPassword(employee?.employee_password);
    setRoleId(employee?.role_id);
  }, [employee]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRoleIdChange = (event) => {
    setRoleId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {};
    formData["name"] = name;
    formData["username"] = username;
    formData["password"] = password;
    formData["role"] = {
      id: roleId,
    };

    console.log(formData);

    await axios
      .put(`http://localhost:8080/api/employees/${employee?.id}`, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    setName("");
    setUsername("");
    setPassword("");
    setRoleId("");
    handleClose();
  };

  return (
    <Dialog
      open={employee != null}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.customTitle}>
        Edit employee
      </DialogTitle>
      <DialogContent>
        <Formik validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(formikProps) => (
            <Form>
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
                  autoFocus
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  value={name}
                  onChange={handleNameChange}
                />
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  variant="outlined"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <FormControl>
                  <InputLabel id="roleIdLabel">Role</InputLabel>
                  <Select
                    labelId="roleIdLabel"
                    id="roleId"
                    defaultValue={employee?.role_id}
                    value={roleId}
                    label="Role"
                    onChange={handleRoleIdChange}
                  >
                    {roles.map((role, index) => (
                      <MenuItem key={index} value={role.id}>
                        {role.role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Edit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateEmployee;