
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
import DirectionsBus from 'material-ui-icons/DirectionsBus';
import AddCircle from 'material-ui-icons/AddCircle';
import {data} from '../data';


const styles = theme => ({
  root: {
     width: '100%',
     width: 350,
     backgroundColor: theme.palette.background.paper,
     position: 'relative',
     overflow: 'auto',
     maxHeight: 400,

   },
  demo: {
    backgroundColor: '#A2E6BC',
  },
  title: {
    margin: 0,
  },
  item: {
    marginBottom: 10
  },
  text:{
    alignItems: ''
  }
});


let auxe= ' '
 class InteractiveList extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       dense: false,
       secondary: false,
       all_cars_licenses: [],
       displayedLicenses: [],
       removed_vehicles: [],
       cars: ' ',
       id_linea: props.id_linea,
       licenses: props.licenses,
       eliminatedGroup_license: props.eliminatedGroup_license
     }
   }




/////////////////////////
////////////////////////
  componentDidMount(){
    var  aux = data.enterprise;
    var vehicles = []
      for(var i=0; i<aux.length; i++){
        var vehicle = aux[i].vehicle;
          for(var k=0; k<vehicle.length; k++){
              vehicles.push(vehicle[k].license);
          }
      }
        this.setState({
          all_cars_licenses: vehicles,
          displayedLicenses: vehicles //acá se reciben las licensias de todas las unidades de todas las empresas para ser rendereadas en la lista inicial
        })
  }
///////////////////////////////
////////////////////////////////
 componentWillReceiveProps(nextProps){
   if (nextProps.id_linea != this.props.id_linea) {
      this.displayedLicensesSetup(nextProps.id_linea , nextProps.licenses);
    }

    if(nextProps.eliminatedGroup_license != this.props.eliminatedGroup_license){
        this.reAddVehicleToList(nextProps.eliminatedGroup_license);

    }
 }


removeFromList(displayedLicenses){ //metodo que evalua cuales vehiculos han sido agregados en el Timeline al haber presionado el signo más en la lista, para como consecuencia eliminarlos de la lista ha mostrarse segun la compañia seleccionada
var removed_vehicles = this.state.removed_vehicles;
  for(var i=0; i<displayedLicenses.length ; i++){
      for(var j=0; j<removed_vehicles.length ;j++){
          if(displayedLicenses[i] === removed_vehicles[j]){
             displayedLicenses.splice(i,1);
          }
      }
  }
  this.setState({
    displayedLicenses: displayedLicenses
  })
}
//////////////////////
/////////////////////
  updateList(nextPropsLicenses){ // metodo que recibe las unidades de Transporte a ser dispuestas en una lista según el id de la línea de la compañia
    var licenses = [];
    var selectedEnterpriseLicenses = nextPropsLicenses;
      if(selectedEnterpriseLicenses.length === 0){
        licenses = [];
      }else{
        licenses = selectedEnterpriseLicenses;
      }
      return licenses;
  }
////////////////////////
////////////////////////
reAddVehicleToList(nextProps){ //metodo utilizado para eliminar del array de unidades eliminadas, la unidad de transporte a incorporar nuevamente en la lista
  var removed_vehicles = this.state.removed_vehicles;
  var pos =  removed_vehicles.indexOf(nextProps);
  removed_vehicles.splice(pos,1);
  this.setState({
    removed_vehicles: removed_vehicles
  })
  var displayedLicenses = this.state.displayedLicenses;
      displayedLicenses.push(nextProps);
      this.removeFromList(displayedLicenses);
}


onAddIconClick(item, licenses){ //este metodo se acciona al presionar el signo más de una unidad en la lista. Lo que hace es que actualiza un arreglo con las unidades eliminadas de la lista
  var pos= licenses.indexOf(item);
  var removed_vehicles = this.state.removed_vehicles;
  removed_vehicles.push(item);
  this.props.onClick(item)
  licenses.splice(pos,1);

  this.setState({
    displayedLicenses: licenses,
    removed_vehicles: removed_vehicles
  })
}
//////////////////////////
////////////////////////
displayedLicensesSetup(id_linea, nextPropsLicenses){ //en esta funcion se definirá this.state.displayedLicenses la cual contiene las unidades de la empresa selecciona o la de todas en conjunto.
  if(id_linea != ' ' ){                               // en caso de que no se haya seleccionado ninguna empresa se asignarán todas las unidades de las empresas en conjunto
    var selectedEnterpriseLicenses = this.updateList(nextPropsLicenses);
        this.removeFromList(selectedEnterpriseLicenses);
  }else{
    var selectedEnterpriseLicenses = this.state.all_cars_licenses;
      this.removeFromList(selectedEnterpriseLicenses);
  }
}



////////////////////
  render() {
    const { dense, secondary } = this.state;

    console.log('mi this.state.removed_vehicles');
    console.log(this.state.removed_vehicles);
    console.log('demo');
    console.log(this.props.classes.demo);

    return (
      <div className={this.props.classes.root}>

        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography variant="title" className={this.props.classes.title}>

            </Typography>
            <div className={this.props.classes.demo}>
              <List dense={dense}>
                {this.state.displayedLicenses.map(item => (
                <ListItem key={`item-${item}`}>
                    <ListItemAvatar>
                        <Avatar>
                          <DirectionsBus />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item}
                                  secondary={secondary ? 'Secondary text' : null}
                                  className={this.props.classes.item}/>
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Add">
                        <AddCircle onClick={this.onAddIconClick.bind(this, item, this.state.displayedLicenses)}/>
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
              ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

InteractiveList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveList);
