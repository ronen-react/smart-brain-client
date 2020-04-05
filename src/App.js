import React, { Component } from 'react';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai'; // moved to backend

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'



//  Note : installed particles react js

import './App.css';

// taken to server:
// const app = new Clarifai.App({
//  apiKey: 'd05958c650c74c968cc62037f3f736e7'
// });

const particleOptions = {
                particles: {
                       number: {
                    value: 30,
                    density: {
                      enable: true,
                      value_area: 300

                    }
                  }
                }
}

 const initialState = {
      input: '',
      imageUrl: '',
      box:  {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box:  {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }

  }

  loadUser = (data) => {
    this.setState( {user: {
         id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculate_face_location = (data) => {
    console.log(data)
    const clarfiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, width)
    return {
        leftCol: clarfiFace.left_col * width,
        topRow: clarfiFace.top_row * height,
        rightCol: width - (clarfiFace.right_col * width),
        bottomRow: height -  (clarfiFace.bottom_row * height)


    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
    console.log(event.target)

  }
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/imageUrl', 
    {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
    })
    .then(response =>      
         response.json())// equivalent to {return response.json()})
    .then(response => {
        console.log(response)
      if (response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
          })

        })
        .then(response => response.json())
        .then(count => {
          console.log('count!!!!', count)
          this.setState(Object.assign(this.state.user, {entries: count}))
          console.log('count!!!!', this.state.user.entries)


        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculate_face_location(response))
    })
    .catch(err => console.log(err))
     
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState) // note: initially was {isSignedIn: false} but initialState cleans leftovers (fixed in code revioew)
    } else if (route === 'home'){
        this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render(){
    const {isSignedIn, imageUrl, route, box} = this.state
    return (
        <div className="App">
          <Particles className='particles'
                  params={particleOptions}/>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home' ?
           <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
            : (
             this.state.route === 'signin' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>


            )

          }
        </div>
      );
  }
}

export default App;

