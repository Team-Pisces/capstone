import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits} from '../store/habits'

class Habits extends React.Component {
  componentDidMount() {
    this.props.fetchHabits()
  }
  render() {
    const {habits} = this.props
    return (
      <div>
        <h1>Habits</h1>
        <div>
          {habits.length ? (
            habits.map(habit => {
              return (
                <div key={habit.id}>
                  <h3>{habit.habitName}</h3>
                  <h4>{habit.history}</h4>
                </div>
              )
            })
          ) : (
            <h1>No Habits</h1>
          )}
        </div>
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

export default connect(mapState, mapDispatch)(Habits)
