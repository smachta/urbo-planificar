import React, { Component } from 'react'
import moment from 'moment'
import Timeline from 'react-calendar-timeline/lib'
import generateFakeData from './generate-fake-data'
import pubsub from 'pubsub-js';
import MultipleSelect from './companySelector';

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}






export default class Calendar extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
    console.log(items);
    const defaultTimeStart = moment().startOf('day').toDate()
    const defaultTimeEnd = moment().startOf('day').add(1, 'day').toDate()

    this.state = {
      groups: groups,
      items: items,
      defaultTimeStart: defaultTimeStart,
      defaultTimeEnd: defaultTimeEnd,
      itemEvent: ' ',
    }
  }


  /////////////////
  generateGroupItems(group, items){

    this.setState({
      groups: group,
      items: items
    })
  }


///Evento Cuando quieres mover el item
  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: dragTime,
        end: dragTime + (item.end - item.start),
        group: group.id
      }) : item)
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }
//////////////////////
onClickEliminar() {
if(this.state.itemEvent != ' '){
  var event = this.state.itemEvent
  var items = this.state.items;
  var groups = this.state.groups;
  var groupId =  items[event].group;
  var eliminatedGroup_license =  groups[groupId].title;
    items.splice(event, 1);
    groups.splice(groupId, 1);
    this.setState({
      items:items,
      groups: groups,
      itemEvent: ' '
    })
  }
}

handleItemEvent(){
  if(this.state.itemEvent != ' '){
    var event = this.state.itemEvent
    var items = this.state.items;
    var groups = this.state.groups;
    var groupId =  items[event].group;
    var eliminatedGroup_license =  groups[groupId].title;
  }

  return eliminatedGroup_license;
}

onItemSelect = event => {
  this.setState({
    itemEvent: event
  })
}

//Evento al Ajustar tamaño del item
  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: edge === 'left' ? time : item.start,
        end: edge === 'left' ? item.end : time
      }) : item)
    })

    console.log('Resized', itemId, time, edge)
  }
//////////////////////

///////////////////
  render() {
    const {defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <div>

      <Timeline
        groups={this.state.groups}
        items={this.state.items}
        keys={keys}
        fullUpdate
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        onItemSelect={this.onItemSelect.bind(this)}
        showCursorLine
        canMove={true}
        canResize={true}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onTimeChange={this.handleTimeChange} />

        </div>

    )
  }
}
