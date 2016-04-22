import React, { PropTypes }  from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import {styles} from '../style/style.css.js';
import Photos from './Photos'

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {photos: this.props.photos, img: '', selectedPics: []}
  }

  handleDelete = async(img) => {
    let prompt = confirm('Delete picture?')
    if(prompt === true) {
      let photos = this.state.photos.filter(photo => photo !== img)
      let selectedPics = this.state.selectedPics.filter(selected => selected !== img);
      await this.setState({photos, selectedPics})
      this.props.onChange(this.state.photos)
    }
  }

  selectPicture = (img) => {
    img.checked = !img.checked;
    if(!img.checked) {
      let {selectedPics} = this.state;
      selectedPics = selectedPics.filter(photos => photos !== img);
      this.setState({selectedPics})
    } else{
      let {selectedPics} = this.state;
      selectedPics.push(img);
      this.setState({selectedPics})
    }
  }

  deleteSelected = async(e) => {
    e.preventDefault()
    let {selectedPics, photos} = this.state;
    let prompt = confirm(`Delete ${selectedPics.length} selected pictures?`)
    if(prompt === true) {
      selectedPics.map(pics =>{
        photos = photos.filter(photos => photos !== pics)
      })
      await this.setState({photos, selectedPics: []})
      this.props.onChange(this.state.photos)
    }
  }

  reorderArray = async(e) => {
    e.preventDefault();
    let array = this.state.photos;
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    await this.setState({photos: array})
    this.props.onChange(this.state.photos)
  }

  render () {

    const {selectedPics, photos} = this.state

    const renderPhotos = (tile, i) => {
      return(
        <Photos
          key={i}
          editable={this.props.editable}
          tile={tile}
          deletePicture={this.handleDelete}
          selectPicture={this.selectPicture}
        />
      )
    }

    const renderSelect = () => {
      if(selectedPics.length > 0) {
        let plural = selectedPics.length === 1 ? '' : 's'
        return(
          <div style={styles.warning}>
             {selectedPics.length} selected picture{plural}. <a href="#" onClick={this.deleteSelected}>Delete?</a>
          </div>
        )
      } else{
        return null
      }
    }

    return(
      <div style={styles.root}>
        {renderSelect()}
        <button onClick={this.reorderArray}>Reorder array</button>
        <GridList cols={6} style={styles.gridList} cellHeight={200}>
          {photos.map(renderPhotos, this)}
        </GridList>
      </div>
    )
  }
}


App.propTypes = {
  onChange: PropTypes.func,
  photos: PropTypes.array,
  editable: PropTypes.bool
};

export default App;
