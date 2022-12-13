import React from "react"
import { useState, useEffect } from 'react';
import { AlertTypes } from "../enums/enums"
import { AlertTypesInterface } from "../interfaces/AlertTypesInterface"
import AlertMessage from "./AlertMessage"




export const AlertStatusMessage = ([...props]) => {




  const [alertProps, setAlertProps] = useState({})
  const [open, setOpen] = useState(true);



  const properties: AlertTypesInterface = {
    message: props[0].message,
    aletTypes: props[1].type,
    time: props[2].time
  }


  useEffect(() => {
    console.log('sei lá');
    setAlertProps(properties)
    setOpen(true)
    setTimeout(() => {
      setOpen(false)

    }, props[2].time)
  }, [])





  return (
    <>
      {open && <AlertMessage props={alertProps} />}
    </>
  )
}