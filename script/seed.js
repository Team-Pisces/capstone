'use strict'

const db = require('../server/db')
const {User, Habit, UserHabit} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({firstName: 'Cody', lastName: 'Foo'}),
    User.create({firstName: 'Murphy', lastName: 'Bar'}),
    User.create({firstName: 'Ned', lastName: 'Rez'}),
    User.create({firstName: 'Kevin', lastName: 'Ted'}),
    User.create({firstName: 'John', lastName: 'Mar'})
  ])

  // const habits = await Promise.all([
  //   Habit.create({
  //     habits: {name: 'Buying Coffee', category: 'Coffee Shop', goal: 100},
  //     history: [1],
  //   }),
  //   Habit.create({
  //     habits: {
  //       name: 'Going to the Movies',
  //       category: 'Movie Theatres',
  //       goal: 50,
  //     },
  //     history: [1],
  //   }),
  // ])

  // const currentUser = await User.findByPk(1)
  // const habit = await Habit.findByPk(1)
  // await currentUser.addHabit(habit, {through: {goal: 100}})

  // users.addHabits(habits, {through: {goal: 1}})

  console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${habits.length} habits`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
