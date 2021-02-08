import React from 'react'
// import {connect} from 'react-redux'
// import {fetchWeeklyAvg} from '../store/chart'
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip} from 'victory'

class RedChart extends React.Component {
  compoundInterest(weeklyAvg, year) {
    let result = weeklyAvg * 52 * (1 + 0.08 / 1) ** year
    return result.toFixed(2) * -1
  }
  // componentDidMount() {
  //   this.props.fetchWeeklyAvg(this.props.habitId)
  // }
  render() {
    const compoundInterest = this.compoundInterest
    const weeklyAvg = this.props.weeklyAvg
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
              <VictoryTooltip cornerRadius={0} style={{fill: 'red'}} />
            }
            data={[
              {
                x: 2,
                y: compoundInterest(weeklyAvg, 2),
                label: `$${compoundInterest(weeklyAvg, 2).toLocaleString()}`
              },
              {
                x: 4,
                y: compoundInterest(weeklyAvg, 4),
                label: `$${compoundInterest(weeklyAvg, 4).toLocaleString()}`
              },
              {
                x: 6,
                y: compoundInterest(weeklyAvg, 6),
                label: `$${compoundInterest(weeklyAvg, 6).toLocaleString()}`
              },
              {
                x: 8,
                y: compoundInterest(weeklyAvg, 8),
                label: `$${compoundInterest(weeklyAvg, 8).toLocaleString()}`
              },
              {
                x: 10,
                y: compoundInterest(weeklyAvg, 10),
                label: `$${compoundInterest(weeklyAvg, 10).toLocaleString()}`
              },
              {
                x: 12,
                y: compoundInterest(weeklyAvg, 12),
                label: `$${compoundInterest(weeklyAvg, 12).toLocaleString()}`
              },
              {
                x: 14,
                y: compoundInterest(weeklyAvg, 14),
                label: `$${compoundInterest(weeklyAvg, 14).toLocaleString()}`
              },
              {
                x: 16,
                y: compoundInterest(weeklyAvg, 16),
                label: `$${compoundInterest(weeklyAvg, 16).toLocaleString()}`
              },
              {
                x: 18,
                y: compoundInterest(weeklyAvg, 18),
                label: `$${compoundInterest(weeklyAvg, 18).toLocaleString()}`
              },
              {
                x: 20,
                y: compoundInterest(weeklyAvg, 20),
                label: `$${compoundInterest(weeklyAvg, 20).toLocaleString()}`
              },
              {
                x: 22,
                y: compoundInterest(weeklyAvg, 22),
                label: `$${compoundInterest(weeklyAvg, 22).toLocaleString()}`
              },
              {
                x: 24,
                y: compoundInterest(weeklyAvg, 24),
                label: `$${compoundInterest(weeklyAvg, 24).toLocaleString()}`
              },
              {
                x: 26,
                y: compoundInterest(weeklyAvg, 26),
                label: `$${compoundInterest(weeklyAvg, 26).toLocaleString()}`
              },
              {
                x: 28,
                y: compoundInterest(weeklyAvg, 28),
                label: `$${compoundInterest(weeklyAvg, 28).toLocaleString()}`
              },
              {
                x: 30,
                y: compoundInterest(weeklyAvg, 30),
                label: `$${compoundInterest(weeklyAvg, 30).toLocaleString()}`
              }
            ]}
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
      </div>
    )
  }
}

// const mapState = (state) => ({
//   weeklyAvg: state.chart,
// })

// const mapDispatch = (dispatch) => ({
//   fetchWeeklyAvg: (habitId) => dispatch(fetchWeeklyAvg(habitId)),
// })

export default RedChart
