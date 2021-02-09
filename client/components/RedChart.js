import React from 'react'
// import {connect} from 'react-redux'
// import {fetchWeeklyAvg} from '../store/chart'
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip} from 'victory'
import compound from 'compound-interest-calc'

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

    console.log(compoundInterest(weeklyAvg, years[0]))
    return (
      <div>
        {this.props.weeklyAvg ? (
          <VictoryChart domainPadding={10}>
            <VictoryAxis tickValues={display} tickFormat={displayText} />
            <VictoryBar
              labelComponent={
                <VictoryTooltip cornerRadius={0} style={{fill: 'red'}} />
              }
              data={display.map(year => {
                console.log(compoundInterest(weeklyAvg, year))
                return {
                  x: year,
                  y: compoundInterest(weeklyAvg, year),
                  label: `$${compoundInterest(
                    weeklyAvg,
                    year
                  ).toLocaleString()}`
                }
              })}
              style={{
                data: {fill: 'red', width: 15}
              }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({style: {fill: 'pink', width: 18}})
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
              ]}
            />
          </VictoryChart>
        ) : null}
      </div>
    )
  }
}

export default RedChart
