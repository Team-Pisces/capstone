import React from 'react'
// import {connect} from 'react-redux'
// import {fetchWeeklyAvg} from '../store/chart'
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip} from 'victory'

class GreenChart extends React.Component {
  compoundInterest(weeklyAvg, goal, year) {
    let avg = weeklyAvg - goal
    let result = avg * 52 * (1 + 0.08 / 1) ** year
    return result.toFixed(2) * 1
  }

  render() {
    const compoundInterest = this.compoundInterest
    const weeklyAvg = this.props.weeklyAvg
    const goal = this.props.goal
    return (
      <div>
        <VictoryChart domainPadding={10}>
          <VictoryAxis
            tickValues={[
              2,
              4,
              6,
              8,
              10,
              12,
              14,
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30
            ]}
            tickFormat={[
              '2',
              '4',
              '6',
              '8',
              '10',
              '12',
              '14',
              '16',
              '18',
              '20',
              '22',
              '24',
              '26',
              '28',
              '30'
            ]}
          />
          <VictoryBar
            labelComponent={
              <VictoryTooltip cornerRadius={0} style={{fill: 'green'}} />
            }
            data={[
              {
                x: 2,
                y: compoundInterest(weeklyAvg, goal, 2),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  2
                ).toLocaleString()}`
              },
              {
                x: 4,
                y: compoundInterest(weeklyAvg, goal, 4),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  4
                ).toLocaleString()}`
              },
              {
                x: 6,
                y: compoundInterest(weeklyAvg, goal, 6),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  6
                ).toLocaleString()}`
              },
              {
                x: 8,
                y: compoundInterest(weeklyAvg, goal, 8),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  8
                ).toLocaleString()}`
              },
              {
                x: 10,
                y: compoundInterest(weeklyAvg, goal, 10),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  10
                ).toLocaleString()}`
              },
              {
                x: 12,
                y: compoundInterest(weeklyAvg, goal, 12),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  12
                ).toLocaleString()}`
              },
              {
                x: 14,
                y: compoundInterest(weeklyAvg, goal, 14),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  14
                ).toLocaleString()}`
              },
              {
                x: 16,
                y: compoundInterest(weeklyAvg, goal, 16),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  16
                ).toLocaleString()}`
              },
              {
                x: 18,
                y: compoundInterest(weeklyAvg, goal, 18),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  18
                ).toLocaleString()}`
              },
              {
                x: 20,
                y: compoundInterest(weeklyAvg, goal, 20),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  20
                ).toLocaleString()}`
              },
              {
                x: 22,
                y: compoundInterest(weeklyAvg, goal, 22),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  22
                ).toLocaleString()}`
              },
              {
                x: 24,
                y: compoundInterest(weeklyAvg, goal, 24),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  24
                ).toLocaleString()}`
              },
              {
                x: 26,
                y: compoundInterest(weeklyAvg, goal, 26),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  26
                ).toLocaleString()}`
              },
              {
                x: 28,
                y: compoundInterest(weeklyAvg, goal, 28),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  28
                ).toLocaleString()}`
              },
              {
                x: 30,
                y: compoundInterest(weeklyAvg, goal, 30),
                label: `$${compoundInterest(
                  weeklyAvg,
                  goal,
                  30
                ).toLocaleString()}`
              }
            ]}
            style={{
              data: {fill: 'green', width: 15}
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
      </div>
    )
  }
}

export default GreenChart
