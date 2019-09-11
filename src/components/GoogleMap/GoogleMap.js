import React, { Component } from 'react';

class GoogleMap extends Component {
  googleMapRef = React.createRef();
  state = {
    marker: null
  };

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA9qYozSmyz-YMjY9wDPAXs15pxXSnRbUI&libraries=places`;
    document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', ()=>{
      this.googleMap = this.createGoogleMap();
      this.marker = this.createMarker();
      this.setState({marker: this.marker})
    });
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: 43.642567,
        lng: -79.387054,
      },
      disableDefaultUI: true,
    });

  createMarker = () => {
    let icon = {
      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW   ,
      scale: 4,
      fillColor: '#427af4',
      fillOpacity: 1,
      strokeWeight: 1,
      anchor: new window.google.maps.Point(0, 5),
      rotation:  0
    };
    return new window.google.maps.Marker({
      position: { lat: 43.642567, lng: -79.387054 },
      map: this.googleMap,
      icon: icon,
    });
  };

  style = {
    width: '300px',
    height: '400px'
  };

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={this.style}
      />
    );
  }
}

export default GoogleMap;
