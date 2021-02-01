import {Card, CardContent, Typography} from '@material-ui/core'
import React from 'react'

export default function Balance(props) {
  const {balance} = props

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h5">
          Current Balance: {balance}
        </Typography>
      </CardContent>
    </Card>
  )
}
