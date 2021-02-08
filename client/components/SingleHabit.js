import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleHabit} from '../store/singleHabit'
import RedChart from './RedChart'
import GreenChart from './GreenChart'

class SingleHabit extends React.Component {
  componentDidMount() {
    this.props.fetchSingleHabit(this.props.match.params.habitId)
  }
  render() {
    const {habit} = this.props
    const goal = habit.goal
    const weeklyAvg = habit.initialWeeklyAvg / 100
    return (
      <div>
        <RedChart weeklyAvg={weeklyAvg} />
        <GreenChart goal={goal} weeklyAvg={weeklyAvg} />
      </div>
    )
  }
}

const mapState = state => ({
  habit: state.singleHabit
})

const mapDispatch = dispatch => ({
  fetchSingleHabit: id => dispatch(fetchSingleHabit(id))
})

export default connect(mapState, mapDispatch)(SingleHabit)
