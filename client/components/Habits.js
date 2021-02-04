import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits, addHabit} from '../store/habits'
import {fetchCategories} from '../store/categories'

class Habits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      category: '',
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
    this.props.fetchCategories()
  }

  render() {
    const habits = this.props.habits || []
    const {categories} = this.props
    return (
      <div>
        <h1>Habits</h1>
        <div>
          {habits.length ? (
            habits.map((habit, i) => {
              return (
                <div key={i}>
                  <h3>
                    Habit: {habit.name} | Goal: ${habit.goal}
                  </h3>
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
              name="name"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
            />

            <label htmlFor="category">Category: </label>
            <select
              name="category"
              onChange={this.handleChange}
              value={this.state.category}
            >
              <option>Select Category</option>
              {categories.length
                ? categories.map(category => {
                    return (
                      <option key={category.category_id}>
                        {category.hierarchy[category.hierarchy.length - 1]}
                      </option>
                    )
                  })
                : null}
            </select>

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
  habits: state.habits,
  categories: state.categories
})

const mapDispatch = dispatch => ({
  fetchHabits: () => dispatch(fetchHabits()),
  addHabit: habit => dispatch(addHabit(habit)),
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(Habits)
