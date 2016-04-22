import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import IconButton from 'material-ui/lib/icon-button';

class Photos extends React.Component {

  _handleDelete = () => {
    this.props.deletePicture(this.props.tile)
  }

  _selectPicture = () => {
    this.props.selectPicture(this.props.tile)
  }

  _handleOpen = () => {
    const win = window.open(this.props.tile.fileUrl, '_blank');
    win.focus();
  }

  render () {

    const {tile} = this.props

    return(
      <span>
        {this.props.editable ?
          <Checkbox
            defaultChecked={tile.checked}
            onCheck={this._selectPicture}
            style={{position: 'absolute', zIndex: 99, padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.72)'}}
            />
          : ''
        }
        <GridTile
          title="Cat"
          subtitle={<span>by <b>Cat</b></span>}
          actionIcon={this.props.editable ? <IconButton onClick={this._handleDelete}><Delete color="white"/></IconButton> : ''}
        >
          <img onClick={this._handleOpen} src={tile.fileUrl} style={{cursor: 'pointer'}}/>
        </GridTile>
      </span>
    )
  }
}

Photos.propTypes = {
    deletePicture: PropTypes.func,
    selectPicture: PropTypes.func,
    editable: PropTypes.bool,
    tile: PropTypes.object
};

export default Photos;
