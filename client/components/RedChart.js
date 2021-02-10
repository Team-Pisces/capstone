import React from 'react'
// import {connect} from 'react-redux'
// import {fetchWeeklyAvg} from '../store/chart'
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip} from 'victory'
import compound from 'compound-interest-calc'
import {Card, CardContent, Typography} from '@material-ui/core'

class RedChart extends React.Component {
  compoundInterest = (weeklyAvg, year) => {
    return compound(0, weeklyAvg, year, 0.07, 52).result
  }

  render() {
    const compoundInterest = this.compoundInterest
    const weeklyAvg = this.props.weeklyAvg || null
    let years = Array(30)
      .fill(1, 0, 30)
      .map((num, index) => num + index)

    let display = years.filter(num => num % 2 === 0)
    let displayText = display.map(val => val.toString())

    let type = this.props.type || ''
    return (
      <Card>
        {this.props.weeklyAvg ? (
          <CardContent>
            <Typography variant="h4">
              Potential {type === 'spending' ? 'Loss' : 'Gain'}:
            </Typography>
            <VictoryChart domainPadding={10}>
              <VictoryAxis tickValues={display} tickFormat={displayText} />
              <VictoryBar
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    style={
                      type === 'spending' ? {fill: 'red'} : {fill: 'green'}
                    }
                  />
                }
                data={display.map(year => {
                  return {
                    x: year,
                    y:
                      compoundInterest(weeklyAvg, year) *
                      (type === 'spending' ? -1 : 1),
                    label: `${
                      type === 'spending' ? '-' : ''
                    }$${compoundInterest(weeklyAvg, year).toLocaleString()}`
                  }
                })}
                style={
                  type === 'spending'
                    ? {data: {fill: 'red', width: 15}}
                    : {
                        data: {fill: 'green', width: 15}
                      }
                }
                events={
                  type === 'spending'
                    ? [
                        {
                          target: 'data',
                          eventHandlers: {
                            onMouseOver: () => {
                              return [
                                {
                                  target: 'data',
                                  mutation: () => ({
                                    style: {fill: 'pink', width: 18}
                                  })
                                },
                                {
                                  target: 'labels',
                                  mutation: () => ({active: true})
                                }
                              ]
                            },
                            onMouseOut: () => {
                              return [
                                {
                                  target: 'data',
                                  mutation: () => {}
                                },
                                {
                                  target: 'labels',
                                  mutation: () => ({active: false})
                                }
                              ]
                            }
                          }
                        }
                      ]
                    : [
                        {
                          target: 'data',
                          eventHandlers: {
                            onMouseOver: () => {
                              return [
                                {
                                  target: 'data',
                                  mutation: () => ({
                                    style: {fill: 'LightGreen', width: 18}
                                  })
                                },
                                {
                                  target: 'labels',
                                  mutation: () => ({active: true})
                                }
                              ]
                            },
                            onMouseOut: () => {
                              return [
                                {
                                  target: 'data',
                                  mutation: () => {}
                                },
                                {
                                  target: 'labels',
                                  mutation: () => ({active: false})
                                }
                              ]
                            }
                          }
                        }
                      ]
                }
              />
            </VictoryChart>
            <Typography variant="caption">
              Hypothetical 'Loss' projection if weekly average spending
              continues.
            </Typography>
          </CardContent>
        ) : null}
      </Card>
    )
  }
}

export default RedChart
