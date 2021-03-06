import faker from 'faker'
import randomColor from 'randomcolor'
import moment from 'moment'

export default function (groupCount = 5, itemCount = 5, daysInPast = 10) {
  let randomSeed = Math.floor(Math.random() * 1000)
    let groups = []
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: ' ',
      rightTitle: 'Machta',
      bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i })
    })
  }

  let items = []
  for (let i = 0; i < itemCount; i++) {
    const startDate = faker.date.recent(daysInPast).valueOf() + (daysInPast * 0.3) * 86400 * 1000

    const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000
    //console.log('fecha de inicio');
    //console.log(startValue);
    const endValue = moment(startDate + faker.random.number({ min: 2, max: 20 }) * 15 * 60 * 1000).valueOf()
  //  console.log('fecha de finalizacion');
    //console.log(endValue);
    items.push({
      id: i + '',
      group: faker.random.number({ min: 1, max: groups.length }) + '',
      title: 'xsddsds',
      start: startValue,
      end: endValue,
      // canMove: startValue > new Date().getTime(),
      // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
      className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
      itemProps: {
        'data-tip': faker.hacker.phrase()
      }
    })
  }

  items = items.sort((a, b) => b - a)

  return { groups, items }
}
