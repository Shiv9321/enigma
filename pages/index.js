import React, { useState, useEffect, useContext } from "react";

import {
<<<<<<< HEAD
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  }
    from "../components/index";

import { TrackingContext } from "@/context/Tracking";

const index = () => {
  const {
=======
Table,
Form,
Services,
Profile,
CompleteShipment,
GetShipment,
StartShipment,
}
  from "../Components/index";

import { TrackingContext } from "../Conetxt/TrackingContext";

const index = () => {
  const
    {
>>>>>>> origin/main
      currentUser,
      createShipment,
      getAllShipment,
      completeShipment,
      getShipment,
      startShipment,
      getShipmentsCount,
    } = useContext(TrackingContext);
<<<<<<< HEAD

  //State variable
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModal, setGetModel] = useState(false);

  //data state
  const [allShipmentsdata, setallShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () =>  {
      const allData = await getCampaignsData;
      setallShipmentsdata(allData);
    };
  }, []);

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />
      <Table

        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModal}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={StartShipment}
      />
    </>
  );
}

export default index;
=======
}

//State variable
const [createShipment, setCreateShipmentModel] = useState(false);
const [openProfile, setOpenProfile] = useState(false);
const [startModal, setModal] = useState(false);
const [completeModal, setCompleteModal] = useState(false);
const [getModal, setGetModel] = useState(false);

//data state
const [allShipmentsdata, setallShipmentsdata] = useState();

useEffect(  () =>
{
  const getCampaignsData = GetShipment();

  return (async () =>
  {
    const allData = await getCampaignsData;
    setallShipmentsdata(allData);
  }
)}, []);

return
(
  <>
    <Services
      setOpenProfile={setOpenProfile}
      setCompleteModal={setCompleteModal}
      setGetModel={setGetModel}
      setStartModal={setStartModal}
    />
    <Table

      setCreateShipmentModel={setCreateShipmentModel}
      allShipmentsdata={allShipmentsdata}
    />
    <Form
      createShipmentModel={setCreateShipmentModel}
      createShipment={createShipment}
      setCreateShipmentModel={setCreateShipmentModel}
    />
    <Profile
      openProfile={openProfile}
      setOpenProfile={setOpenProfile}
      currentUser={currentUser}
      getShipmentsCount={getShipmentsCount}
    />
    <CompleteShipment
      completeModal={completeModal}
      setCompleteModal={setCompleteModal}
      completeShipment={CompleteShipment}
    />
    <GetShipment
      getModel={getModal}
      setGetModel={setGetModel}
      getShipment={GetShipment}
    />
    <StartShipment
      startModal={startModal}
      setStartModal={startModal}
      startShipment={StartShipment}
    />
  </>
);


export default index;
>>>>>>> origin/main
