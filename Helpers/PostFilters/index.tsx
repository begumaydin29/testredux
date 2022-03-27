import React from 'react';
import { useEffect, useState } from "react";
import { AutocompleteArrayInput, AutocompleteInput, Filter, NullableBooleanInput, RadioButtonGroupInput, SelectInput, TextInput, useDataProvider } from 'react-admin';
import {useAppDispatch} from "../../index";
import {fetchData, fetchDataAction} from "../../Slices/FleetType";
import {useAppDataProvider} from "../../dataprovider";

export const PostFilters = (props) => {

  const dp = useAppDataProvider();

  const dispatch = useAppDispatch();
  const [fleetType, setFleetType] = useState([]);


  useEffect(() => {

    dp.FleetTypes().then(data => {
      const fleetTypes = dispatch(fetchData(data));

      if (fleetTypes) {
        setFleetType(fleetTypes.payload.data);

      }});

  }, []);

  const fleetTypeChoices = fleetType.map((fleetType) => ({
    id: fleetType,
    name: fleetType,
  }));

  const props_fleetType = "acmasters.any(v => v.Fleet.Equals($.ToUpper()))";

  return (
    <Filter {...props} >

      <AutocompleteInput label="Fleet Type" source={props_fleetType} choices={fleetTypeChoices} optionText="id" optionValue="name"
      />

    </Filter >

  )
};
