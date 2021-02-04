import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits, addHabit} from '../store/habits'
import {fetchCategories} from '../store/categories'
import Transactions from './Transactions'
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  FormContent,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  Card,
  CardContent
} from '@material-ui/core'

class Habits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      goal: 0
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('Hit me!')
    this.props.addHabit(this.state)
  }

  render() {
    const habits = this.props.habits || []
    const {categories} = this.props
    return (
      <Box>
        <Grid container spacing={3} justify="center">
          <Box width="25vw" paddingTop="40px" paddingRight="20px">
            <Card>
              <CardContent>
                <Typography>Habit Name</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box width="25vw" paddingTop="40px" paddingLeft="20px">
            <Typography variant="h5">New Habit</Typography>
            <FormGroup id="add-habit-form" onSubmit={this.handleSubmit}>
              <FormControl>
                <InputLabel htmlFor="habit">Habit: </InputLabel>
                <Input
                  name="name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </FormControl>

              {/* <label htmlFor="category">Category: </label>
              <Select
                name="category"
                onChange={this.handleChange}
                value={this.state.category}
              >
                <option>Select Category</option>
                {categories.length
                  ? categories.map((category) => {
                      return (
                        <MenuItem key={category.category_id}>
                          {category.hierarchy[category.hierarchy.length - 1]}
                        </MenuItem>
                      )
                    })
                  : null}
              </Select> */}
              <FormControl>
                <FormHelperText htmlFor="goal">Goal: </FormHelperText>
                <Input
                  name="goal"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.goal}
                />
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </FormControl>
            </FormGroup>
          </Box>

          <Box width="80vw">
            <Typography>Check All that Apply</Typography>
            <Transactions habitForm={true} />
          </Box>
        </Grid>
      </Box>
    )
  }
}

const mapState = state => ({
  habits: state.habits,
  categories: state.categories
})

const mapDispatch = dispatch => ({
  addHabit: habit => dispatch(addHabit(habit))
})

export default connect(mapState, mapDispatch)(Habits)
