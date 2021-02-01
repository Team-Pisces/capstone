import {Card, CardContent, Typography} from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {fetchBalance} from '../store/plaid'

export default function Balance() {
  const balance = useSelector(fetchBalance())

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
