import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import _ from 'lodash'

const photos =
  _.map(_.range(1, 20), function (num) {
    if(num >= 10) {
      return {
        fileUrl: `http://lorempixel.com/400/200/animals/${num-9}`,
        checked: false
      }
    }
    return {
      fileUrl: `http://lorempixel.com/400/200/nightlife/${num}`,
      checked: false
    }
  })

const handleChange = (data) => {
  sessionStorage.setItem('pictures', JSON.stringify(data));
}

render(
  <App photos={photos} editable={true} onChange={handleChange}/>,
  document.querySelector('#root')
);
