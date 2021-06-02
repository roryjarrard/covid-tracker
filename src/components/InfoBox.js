import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import '../css/InfoBox.css'

function InfoBox({ title, cases, total, active, casesType, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${
        active && 'infoBox--selected'
      } infoBox--${casesType}`}
    >
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>

        <h2 className='infoBox__cases'>{cases}</h2>

        <Typography className='infoBox__total'>{total} Total</Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
