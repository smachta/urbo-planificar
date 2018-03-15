import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import {data} from '../data.js'




const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultipleSelect extends React.Component {

  constructor(props){
    super(props);
    this.state={
      name:[],
      companies:[]
    }
  }


  hola(){
    console.log('selector')
  }

componentDidMount(){
  var aux = data.enterprise;
  var companies_id= [];
  for(var i=0; i<aux.length; i++ ){
   companies_id[i] = aux[i].id_enterprise;
  }
  this.setState({
    companies: companies_id
  })
}


  render() {
    const { classes, theme } = this.props;
    const companies = this.state.companies;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple">Linea</InputLabel>
          <Select
            multiple
            value={this.props.name}
            onChange={this.props.onChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {companies.map(name => (
              <MenuItem
                key={name}
                value= {name}
                style={{
                  fontWeight:
                    this.props.name.indexOf(name) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
              {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
