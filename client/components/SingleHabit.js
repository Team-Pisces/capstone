import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleHabit} from '../store/singleHabit'
import RedChart from './RedChart'

class SingleHabit extends React.Component {
  componentDidMount() {
    this.props.fetchSingleHabit(this.props.match.params.habitId)
  }
  render() {
    const {habit} = this.props
    return (
      <div>
        <RedChart weeklyAvg={habit.initialWeeklyAvg} />
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
