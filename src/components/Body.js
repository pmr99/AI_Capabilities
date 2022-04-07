import React from 'react';
import Categories from './Categories';

export default class Body extends React.Component {
  state = {
    loading: true, //if API call fails
    info: null, //All the information from API 
    cat: null, //Categories
    cat_to_tile: null, //Dictionary {Category: {Title: Enable Status}}
  };

  async componentDidMount() {
    const url = "https://us-central1-infinitus-interviews.cloudfunctions.net/take-home-b";
    const response = await fetch(url);
    const data = await response.json();

    //creating a list for categories 
    const categories = []
    for (let i = 0; i < data.length; i++) {
      categories.push(data[i].category)
    }
    const uniqueChars = [...new Set(categories)]; //removing repetitions

    //creating a dictionary {Category: {Title: Enable Status}}
    const cat_to_tile = {}
    for (let i = 0; i < uniqueChars.length; i++) {
      cat_to_tile[uniqueChars[i]] = {}
      for (let k = 0; k < data.length; k++) {
        if (data[k].category == uniqueChars[i]) {
          cat_to_tile[uniqueChars[i]][data[k].title] = data[k].enabled
        }
      }
    }
    this.setState({loading: false , info: data, cat: uniqueChars, 
      cat_to_tile: cat_to_tile} );

}

  render() {
    if (this.state.loading) {
      return <div>Unable to fetch data from API</div>;
    }
    return (
      <div>
        { this.state.cat.map(post => {
          return(
            <>
              <Categories title={this.state.cat_to_tile[post]} category={post}  />
            </>
          )
        })}
        </div>
    );
  }
}
