import Senators from './data/senators'

console.log(Senators.length, 'Senators')


const senators = Senators
  .filter((senator) => {
    return senator.person.lastname === 'Hatch'
  })
  .map((senator) => {
    return {
      party: senator.party,
      gender: senator.person.gender,
      firstName: senator.person.firstname,
      lastName: senator.person.lastname,
    }
  })
  .reduce((prev, current) => {
    return current
  }, false)

console.log(senators)


console.log(Senators.find((senator) => {
  return senator.person.lastname === 'Hatch'
}))


// console.log(Senators[0])


//
// const males = Senators.filter((senator) => {
//   return senator.person.gender === 'male'
// })
//
// console.log(males.length, 'Males')
//
// const females = Senators.filter((senator) => {
//   return senator.person.gender !== 'male'
// })
//
// console.log(females.length, 'Females')
//
//
// const republicans = Senators.filter((senator) => {
//   return senator.party === 'Republican'
// })
//
// console.log(republicans.length, 'Republicans')
//
// const democrats = Senators.filter((senator) => {
//   return senator.party === 'Democrat'
// })
//
// console.log(democrats.length, 'Democrats')
//
//
// const femaleRepublicans = Senators.filter((senator) => {
//   return senator.person.gender !== 'male' && senator.party === 'Republican'
// })
//
// console.log(femaleRepublicans.length, 'Female Republicans')
