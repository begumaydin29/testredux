import {
  FormDataConsumer,
    TextInput,
    NumberField,
    List,
    Datagrid,
    DateField,
    useDataProvider,
    useNotify,
    SimpleForm,
    AutocompleteInput,
    DateInput,
    TextField,
    EditButton, ReferenceField, Edit, Toolbar, SaveButton, Labeled
} from "react-admin";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAppDispatch, RootState, useAppSelector} from "../index";
import {fetchData, fetchDataAction} from "../Slices/FleetType";
import {fetchRevisionNo} from "../Slices/RevisionNo";
import {Chip, CircularProgress, Dialog, Drawer} from "@material-ui/core";
import { Route } from 'react-router';
import {PostEdit} from "../Helpers/PostEdit";
import {PostFilters} from "../Helpers/PostFilters";
import {connect, useSelector, useStore} from "react-redux";
import {createAxios, getEnvironmentConfig, useTtmsAuth} from "@tt/ttms-react-core";
import {postSaveNewRevision} from "../Slices/NewRevision";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {useAppDataProvider} from "../dataprovider";
import {fetchRevisionDate} from "../Slices/RevisionDate";

const RevisionPanel = (props) => {
  const dp = useAppDataProvider();

  const notify = useNotify();

  const { user } = useTtmsAuth();

  const dispatch = useAppDispatch();

  const newRevision  = useSelector((state:RootState) => state);

  console.log("RevisionPanel", newRevision);

  const [fleetTypeValue, setFleetTypeValue] = useState<any[]>([]);
  const [revisionNoValue, setRevisionNoValue] = useState<number>();
  const [revisionDateValue, setRevisionDateValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openNewRevision, setOpenNewRevisionView] = useState<boolean>(false);
  const [item, setItem] = useState({} as any);
  const [userRegId, setUserRegId] = useState({} as any);
  const [revisionNo, setRevisionNo] = useState({} as any);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    setUserRegId(user?.employeeId);

    dp.FleetTypes().then(data => {

      const fleetTypes = dispatch(fetchData(data));

      if(fleetTypes) {
        setFleetTypeValue(fleetTypes.payload.data);
      }

    });

    if(openNewRevision){
      setRevisionNo(item.revisionNo + 1);
    }

  }, [userRegId, openNewRevision, revisionNo]);


  const fleetTypeChoices = fleetTypeValue.map((fleetType) => ({
    id: fleetType,
    name: fleetType,
  }));

  const RevisionNoChipField = ({ record, record2 }) => {

    return (
      <span>
        <TextField source="revisionNo" record={record}/>

        <Labeled label="Revision No">
              <Chip variant="outlined"
                    key={record}
                    label={record}
              />
            </Labeled>

        <Labeled label="Revision Date">
               <Chip variant="outlined"
                     key={record2}
                     label={record2}
               />
            </Labeled>

        </span>
    );
  };

  const PostPanel = ({record}) => (

    <List
      {...props} filter={{ fleetType__eq: record.fleetType }} bulkActionButtons={false} exporter={false}
    >
      <Datagrid {...props} optimized>
        <TextField source="revisionNo" label="REVISION NO"/>
        <DateField source="revisionDate" label="REVISION DATE" locales="fr-FR"/>
        <TextField source="createdBy" label="CREATED BY"/>
        <DateField source="createdDate" label="CREATED DATE" locales="fr-FR"/>
      </Datagrid>
    </List>
  );

  const onEditClick = (record) => {
    setOpen(true);
  };


  const onNewRevisionClick = (record)=>{
    setItem(record);
    setOpenNewRevisionView(true);
  }

  const NewRevisionButton = ({ record }) => {
    return (
      <IconButton color="primary" aria-label="add circle outline"
        onClick={() => onNewRevisionClick(record)}>

        <AddCircleOutlineIcon />

      </IconButton>
    );
  };

  const handleClose =
    useCallback(
      (record) => {
        setOpen(false);
        setOpenNewRevisionView(false);
        setItem({});
      },
      [open, openNewRevision, item],
    );

  const onSaveNewRevision = (record)=>{

    dp.SaveNewRevision(userRegId, record).then(data => {

      const state = dispatch(postSaveNewRevision(data));

      if(state){
        if(state.payload.data){
          setLoading(false)
          setOpenNewRevisionView(false);
          setItem({});
          notify("New Revision Saved Successfully");
        }else{
          setLoading(true);
        }
      }


    });
  }

  if (loading) return <CircularProgress color="primary" size={20} />;

  return (
    <>
      <SimpleForm toolbar={false} {...props}>

        <AutocompleteInput source="fleetType" choices={fleetTypeChoices} optionText="id" optionValue="name"
        />

        <FormDataConsumer>
          {({formData, ...rest}) => {

            if(formData.fleetType !== undefined) {

              dp.RevisionNo(formData.fleetType).then(data => {

                const revisionNo = dispatch(fetchRevisionNo(data));

                dp.RevisionDate(formData.fleetType).then(data => {

                  const revisionDate = dispatch(fetchRevisionDate(data));

                  if(revisionNo && revisionDate){
                    setRevisionNoValue(revisionNo.payload.data);
                    setRevisionDateValue(revisionDate.payload.data.split(" ")[0]);
                  }

                });

              });
              return (
                  <RevisionNoChipField record={revisionNoValue} record2={revisionDateValue}/>
                );
              }
            }
          }
        </FormDataConsumer>
      </SimpleForm>

      <List
        {...props} filters={<PostFilters />}
      >
        <Datagrid {...props} expand={<PostPanel record={props}/>} optimized>
          <ReferenceField label="Fleet Type" source="fleetType" reference="acmasters">
            <TextField source="fleet" />
          </ReferenceField>
          <TextField source="revisionNo" label="REVISION NO" />
          <DateField source="revisionDate" label="REVISION DATE" locales="fr-FR"/>
          <EditButton onClick={onEditClick}/>
          <NewRevisionButton record={props} />
        </Datagrid>
      </List>

      <Route path="/revizyonucaks/:id">
        {({match
          }) => {
          const isMatch = match && match.params && match.params.id !== "create";
          return (
            <Drawer open={open} onClose={handleClose} anchor="right" >
              {}
              {isMatch ? (
                <PostEdit
                  onCancel={handleClose}
                  id={match?.params.id}
                  {...props}
                />
              ) : null}
            </Drawer>
          );
        }}
      </Route>
      <Dialog open={openNewRevision} onClose={handleClose} id={props.id}>
        {openNewRevision && (
          <Edit resource="revizyonucaks" id={item.id} basePath={props.basePath} undoable={false}>
            <SimpleForm
              toolbar={
                <Toolbar>
                  <SaveButton redirect={false} label="Save" submitOnEnter={true} onSuccess={handleClose} onSave={onSaveNewRevision} />
                </Toolbar>
              }
            >
              <Labeled label="Revision No">
                <Chip variant="outlined"
                      key={revisionNo}
                      label={revisionNo}

                />
              </Labeled>
              <DateInput source="revisionDate" label="Revision Date" locales="fr-FR"
                         inputProps={{
                           min: new Date().toISOString().split('T')[0],
                         }}/>
            </SimpleForm>
          </Edit>
        )}
      </Dialog>
    </>
  );
};

export default RevisionPanel;
