import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits, addHabitThunk} from '../store/habits'

class Habits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      habit: '',
      goal: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addHabit(this.state)
  }

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
        <div>
          <form id="add-habit-form" onSubmit={this.handleSubmit}>
            <label htmlFor="habit">Habit: </label>
            <input
              name="habit"
              type="text"
              onChange={this.handleChange}
              value={this.state.habit}
            />

            <label htmlFor="goal">Goal: </label>
            <input
              name="goal"
              type="number"
              onChange={this.handleChange}
              value={this.state.goal}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  habits: state.habits
})

const mapDispatch = dispatch => ({
  fetchHabits: () => dispatch(fetchHabits()),
  addHabit: habit => dispatch(addHabitThunk(habit))
})

export default connect(mapState, mapDispatch)(Habits)
