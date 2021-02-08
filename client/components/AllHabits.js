import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits} from '../store/habits'
import {Link} from 'react-router-dom'

class AllHabits extends React.Component {
  componentDidMount() {
    this.props.fetchHabits()
  }
  render() {
    const {habits} = this.props
    return (
      <div>
        <h1>All Habits</h1>
        {habits.map(habit => (
          <div key={habit.id}>
            <Link to={`/habits/${habit.id}`}>
              <h4>{habit.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  habits: state.habits
})

const mapDispatch = dispatch => ({
  fetchHabits: () => dispatch(fetchHabits())
})

export default connect(mapState, mapDispatch)(AllHabits)
