// import React, { Component } from 'react';
// import axios from 'axios';


// import { UPDATE, INITIALIZE, UPDATEAMOUNT } from "../../Redux/actions/index";
// import { connect } from "react-redux";
// import { ModalComponent } from '../Modal/modal';
// import { MainSearchBox } from '../Searchbox/searchbox';




// const coordinates = {};

// const refs = {};




// const mapDispatchToProps = dispatch => {
//   return {
//     UPDATE: newSettings => dispatch(UPDATE(newSettings)),
//     INITIALIZE: (firstSettings) => dispatch(INITIALIZE(firstSettings)),
//     UPDATEAMOUNT: newTotal => dispatch(UPDATEAMOUNT(newTotal))
//   };
// };

// const mapStateToProps = (state) => {
//   return { currencies: state.currencies, user: state.user};
// };


// class Map extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             markers: [],
//             activeWindow: '',
//             center: '',
//         }
//         this.createMarker = this.createMarker.bind(this)
//         this.handleShow = this.handleShow.bind(this);
//         this.handleClose = this.handleClose.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.displayInfoWindow = this.displayInfoWindow.bind(this);
//         this.closeInfoWindow = this.closeInfoWindow.bind(this);
//         this.openModalRef = this.openModalRef.bind(this);
//         this.closeModal = this.closeModal.bind(this);
//     }


//     handleChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//       }

//     handleClose() {
//         this.setState({ show: false });
//       }
    
//     handleShow() {
//         this.setState({ show: true });
//       }


//     componentDidMount = () => {

//       if (this.state.center !== null) {
//         if (navigator && navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((pos) => {
//                 const coords = pos.coords;
//                 console.log(coords)
//                 this.setState({
//                     center: {
//                         lat: coords.latitude,
//                         lng: coords.longitude
//                     }
//                 })
//             })
//         }
//     }


//       axios({
//         method: 'get',
//         url: '/api/pin/getPins',
//       }).then(res => {

//         const pins = res.data;

//         pins.forEach(
          
//           function myFunc(item, index, arr){
//             item.coordinates = JSON.parse(item.coordinates)
//           }
//         )

//         this.setState({
//           markers: [...this.state.markers, ...pins]
//         })

//       }).catch(err => console.log(err))
//     }

//     handleSubmit = (e) => {
//         const coord = JSON.stringify(this.coordinates)
//         console.log(coord)
      
//         axios({
//           method: 'post',
//           url: '/api/pin/',
//           data: {
//             title: this.myInput.value,
//             coordinates: coord,
//             category: this.myTheme.value,
//             description: this.myDescrip.value,
//             username: this.props.user.username,

//             }})
//             .then(res => {
//             console.log(res); if(res.code = 200) {
//               console.log("Pin successfully added")
//             }
//             else(
//               console.log("Pin not added")
//             )
//             }).catch(
//               err => console.log(err))

//               window.location.reload(true)
//     }

//     createMarker = (e) => {
//         this.onMapClick()

//         this.coordinates = {
//         lng: e.latLng.lng(),
//         lat: e.latLng.lat()
//       }

   
//       console.log(typeof(coordinates))
     
//     }

//     openModalRef = ({handleShow}) => {
//       this.showModal = handleShow;
//    }
   
//    onMapClick = () => {
//      this.showModal();
//    }

//    closeModal = ({handleClose}) => {
//      this.hideModal = handleClose;
//    }

//   onSubmitClose = () => {
//      this.hideModal();
//    }


//    displayInfoWindow = (i) => {
//     this.setState({
//       activeWindow: i 
//     })
//  }

//  closeInfoWindow = () => {
//    this.setState({
//      activeWindow: "",
//    })
//  }

//  onSearchBoxMounted = ref => {
//   refs.searchBox = ref;
// }

// onPlacesChanged = () => {
//   const places = refs.searchBox.getPlaces();
//   console.log(places)
//   const coord = {
//     lat: places[0].geometry.location.lat(),
//     lng: places[0].geometry.location.lng(),
// }
// this.setState({
//   center: coord
// })
// console.log(this.state.center)

// }

// upVote = (id) => {
//   axios({
//     method: 'put',
//     url: "/api/pin/upvote",
//     data: {
//       username: this.props.user.username,
//       id: id
//     }
//   }).then(res =>
//           console.log(res))
//           .catch(err => 
//             console.log(err))
// }

// downVote = (id) => {
//   console.log(id)
//   axios({
//     method: 'put',
//     url: "/api/pin/downvote",
//     data: {
//       username: this.props.user.username,
//       id: id
//     },
//   }).then(res =>
//     console.log(res))
//     .catch(err => 
//       console.log(err))
// }

// alreadyVoted = (marker) => {
//   if (marker.upvoters.split(',').indexOf(this.props.user.username) !== -1) {
//     return 'upvoted'
//   }
//   else if (marker.downvoters.split(',').indexOf(this.props.user.username) !== -1) {
//     return 'downvoted'
//   }
//   else {
//     return 'novoted'
//   }
// }


//    render() {
    
//    return(
//       <div>
     
//         <GoogleMapExample
//           containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
//           mapElement={ <div style={{ height: `100%` }} /> }
//           googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAR0geQM_jQ-OINiUE5yGOXfRWhlDMIUDQ&libraries=places"
//           loadingElement={<div style={{ height: `100%` }} />}
//           defaultCenter = { this.state.center }
//           defaultZoom = { 13 }
//           onClick={this.createMarker}
//           markerArray={this.state.markers}
//           markerClick={this.displayInfoWindow}
//           activeWindow={this.state.activeWindow}
//           closeWindow={this.closeInfoWindow}
//           onSearchBoxMounted={this.onSearchBoxMounted}
//           onPlacesChanged={this.onPlacesChanged}
//           center={this.state.center}
//           upVote={this.upVote}
//           downVote={this.downVote}
//           userName={this.props.user.username}
//           voted={this.alreadyVoted}

//         />
//         <div>

//         <ModalComponent 
//           show={this.state.show} 
//           onHide={this.handleClose}
//           ref2={this.closeModal}
//           ref={this.openModalRef}
//           onShow={this.handleShow}
//           onClose={this.handleClose} 
//           onSubmit={this.handleSubmit} 
//           inputRef={ref => { this.myInput = ref; }}
//           descripref={ref => { this.myDescrip = ref;}}
//           themeref={ref => { this.myTheme = ref;}}
//           onChange={this.handleChange}  
//         />
//       </div>
//     </div>
//    );
//    }
// };

// const MapComponent = connect(mapStateToProps, mapDispatchToProps)(Map);

// export default MapComponent


