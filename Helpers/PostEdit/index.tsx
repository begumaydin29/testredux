import {Edit, SimpleForm, DateInput, SaveButton, Toolbar, DeleteButton, ListButton, Button} from "react-admin";
import React from "react";

const CustomToolbar = props => (
  <Toolbar {...props}>
    <SaveButton/>
  </Toolbar>
);

export const PostEdit = (props) => (

  <Edit {...props} >
    <SimpleForm toolbar={<CustomToolbar />}>
      <DateInput source="revisionDate" inputProps={{
        min: new Date().toISOString().split('T')[0],
      }} />
    </SimpleForm>
  </Edit>
);
