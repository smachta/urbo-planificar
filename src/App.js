import logo from './logo.svg';
import faker from 'faker'
import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import InteractiveList from './components/carlist';
import MultipleSelect from './components/companySelector';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Icon from 'material-ui/Icon';
import Calendar from './components/timeline';
import {data} from './data';
import './style.css'
import randomColor from 'randomcolor'
import moment from 'moment'
import FloatingActionButtons from './components/addButton'
import Delete from 'material-ui-icons/Delete';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 100
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  div:{
    width:20
  }
});


const countGroups=[]; //variable añadida para contar cuantos grupos o unidades se van añadiendo al timeline


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:[],
      licenses: [],
      id_linea: ' ',
      selected_vehicle: ' ',
      vehicle_added: ' ',
      groups:[],
      eliminatedGroup_license: ' '

    }
    this.handleChange = this.handleChange.bind(this)
  }
////////////////////////
///////////////////////



  handleChange = event => {   //al presionar select

    this.setState({ name: event.target.value });
      var lineas = event.target.value;
      var aux = data.enterprise;
      var license = [];

      if(lineas.length === 0){
        this.setState({licenses: [],
                        id_linea:' ' });
      }

     for(var k=0 ; k<lineas.length; k++){
      for (var i=0; i<aux.length ; i++){
          if(lineas[k] === aux[i].id_enterprise){
               var vehicles = aux[i].vehicle;
                this.setState({licenses: []})
                for(var j=0; j<vehicles.length; j++){
                    license.push(vehicles[j].license);
                }

                this.setState({licenses: license,
                                id_linea: aux[i].id_enterprise })
          }
       }

   }
  };

//////////////////////
/////////////////////
  onClickList(vehicle_added){ //al hacer click en la lista para crear grupos e items y añadirlos al timeline
    var groups= this.createGroup(vehicle_added);
    var items = this.createItem(vehicle_added);
    this.refs.calendar.generateGroupItems(groups, items);
  }
//////////////////////////
/////////////////////////
createGroup(vehicle_added){ //crear un grupo con la licencia seleccionada en el calendario
  let randomSeed = Math.floor(Math.random() * 1000)
  let groups = []
      countGroups.push(vehicle_added);
    for(var i=0; i<countGroups.length; i++){
      groups.push({
        id: `${i}`,
        title: countGroups[i],
        rightTitle: 'Machta',
        bgColor: randomColor({ luminosity: 'light', seed: randomSeed + 1 })
      })
    }
    return groups;
}
////////////////////////////////////
///////////////////////////////////
createItem(){ // crear un item para un grupo dentro del calendario
  let items = [];
  var date= new Date();
  var start= date.getTime();
  var end= start+ 10000000;
  var countItems = countGroups;
 for(var i=0; i<countItems.length; i++ ){
   items.push({
     id: i + '',
     group: i + '',
     title: 'xsddsds',
     start: start,
     end: end,
     itemProps: {
  // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
    'data-custom-attribute': 'Random content',
    'aria-hidden': true,
      onKeyDown: (event) => { console.log('You clicked double!') }
}
   })}
    // canMove: startValue > new Date().getTime(),
    // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
    return items;
}
////////////////////////
/////////////////////////
onClickEliminar() {
  var eliminatedGroup_license = this.refs.calendar.handleItemEvent();
  this.refs.calendar.onClickEliminar();
  var pos = countGroups.indexOf(eliminatedGroup_license);
  countGroups.splice(pos,1);
  this.setState({
    eliminatedGroup_license: eliminatedGroup_license
  })
}
//////////////////////////////
////////////////////////////////



  render() {
    console.log(this.state.name);
    return (
    <div className='bigContainer'>
      <div className='container'>
        <div className='item-containerLeft'>

          <div className='item-select'>
            <MultipleSelect
              onChange={this.handleChange.bind(this)}
              name= {this.state.name}
              ref='selector'/>
          </div>

          <div>
            <InteractiveList
              licenses={this.state.licenses}
              id_linea={this.state.id_linea}
              onClick={this.onClickList.bind(this)}
              eliminatedGroup_license={this.state.eliminatedGroup_license}
              />
          </div>

      </div>

      <div className='item-containerRight'>
        <div>
          <Calendar
            ref='calendar'/>
        </div>
         <div>
            <Button
              className={styles.button}
              variant="raised"

              onClick={this.onClickEliminar.bind(this)}>
                eliminar
              <Delete className={styles.rightIcon} />
            </Button>
        </div>
      </div>
   </div>
</div>
    );
  }
}
