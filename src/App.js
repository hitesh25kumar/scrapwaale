import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {firebaseApp} from './firebase';



class App extends Component {

  constructor(props){
    super(props);
    let id = '9756740984';
    this.profileRef = firebaseApp.database().ref(`profile/${id}`);
    this.itemsRef = firebaseApp.database().ref();
    this.pickupRef = firebaseApp.database().ref('pickup_details');
    this.homeSlides = firebaseApp.database().ref('home');
    this.ratesRef = firebaseApp.database().ref('rateList');
  }
  componentDidMount(){
    // this.updateRateList();
    // this.saveProfile();
    // this.getProfileData();
    // this.addItem();
      this.getRates()
    };
    
   
    
    saveProfile(){
      const id = this.props.MobileNo;
      console.log('id',id)
      const usersRef = this.itemsRef.child(`profile/${id}`);
      usersRef.set({
           Address: {
            HouseNo: this.state.HouseNo,
            Area: this.state.Area,
            Landmark:this.state.Landmark,
            City:this.state.City
        },
        userDetails: {
          phone_no: this.props.MobileNo,
          full_name: this.props.full_name,
        }
      }, function(error){
        if(error){
          console.log('write failed')
        }
        else{
          console.log('Data saved success')
        }
      }
      );
    }

    getProfileData(){
      const that = this;
    return this.profileRef.once("value", function(snapshot) {
       console.log('profile',snapshot.val());
       if(snapshot.val() !== null){
       that.setState({profile:snapshot.val(),HouseNo:snapshot.val().Address.HouseNo,Area:snapshot.val().Address.Area,Landmark:snapshot.val().Address.Landmark,City:snapshot.val().Address.City,Name:snapshot.val().userDetails.full_name,Mobileno:snapshot.val().userDetails.phone_no})
       }
       else{
        that.getMyLocation();
       }
     }, function (errorObject) {
       console.log("The read failed: " + errorObject.code);
     });
    }

    updateHomeContent() {
      const homeRef = this.itemsRef.child('home');
      homeRef.set({
        "homeSlides": [
          {
            "Title": 'Plastic',
            "description": 10,
            "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Slides%2Fslide2.png?alt=media&token=ef4096a1-16ee-4e69-9f2a-b934c96bbc8e'
          },
          {
            "Title": 'Plastic',
            "description": 10,
            "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Slides%2Fslide4.png?alt=media&token=cf95492b-a7b2-40d8-ae15-676902f03be5'
          },
          {
            "Title": 'Plastic',
            "description": 10,
            "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Slides%2Fslide5.jpeg?alt=media&token=220a5851-ff1d-4230-beb6-86684fa7595e'
          },
          {
            "Title": 'Plastic',
            "description": 10,
            "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Slides%2Fslide6.jpeg?alt=media&token=cdef5056-bbae-4552-85ce-b74cb1873995'
          },
          {
            "Title": 'Plastic',
            "description": 10,
            "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Slides%2Fslide9.jpeg?alt=media&token=eb3b3105-98d9-4b25-9145-64c6b2acffba'
          }
        ]
      }, function(error){
        if(error){
          console.log('write failed')
        }
        else{
          console.log('Data saved success')
        }
      }
      );
    }
    
    getHomeSlides(){
      const that = this;
      return this.homeSlides.once("value", function(snapshot) {
         console.log(snapshot.val());
         that.setState({homeSlides:snapshot.val()})
       }, function (errorObject) {
         console.log("The read failed: " + errorObject.code);
       });
     }

     addItem() {
      const id = this.props.route.MobileNo
      const usersRef = this.itemsRef.child(`pickup_details/${id}`);
      usersRef.push({
           pickupData: {
          city: "Bangalore3",  
          locality:"Benson Town",
          Landmark:"Near Colonode Apartments",
          house_no:"24/14 2nd floor"
        },
        userDetails: {
          phone_no: this.props.route.MobileNo,
          full_name: "Hitesh",
        }
      }, function(error){
        if(error){
          console.log('write failed')
        }
        else{
          console.log('Data saved success')
        }
      }
      );
    }

    // Price
    getRates(){
      const that = this;
    return this.ratesRef.once("value", function(snapshot) {
       console.log('rates',snapshot.val());
       that.setState({rates:snapshot.val()})
     }, function (errorObject) {
       console.log("The read failed: " + errorObject.code);
     });
   }
   updateRateList() {
    const usersRef = this.itemsRef.child('rateList');
    usersRef.set({
      "RateChart": [
        {
          "materialType": 'Plastic',
          "price": 10,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/plastic.png?alt=media&token=d8c635d2-54ca-466d-bbe0-b8c69aa81523'
        },
        {
          "materialType": 'Newspaper',
          "price": 6,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/newspaper.png?alt=media&token=e09e0ad4-6167-48b2-b581-40a1cdc73959'
        },
        
        {
          "materialType": 'Tin',
          "price": 12,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/tin.png?alt=media&token=5f410a81-84b4-45ae-bf9f-2580d5bae62a'
        },
        {
          "materialType": 'Steel',
          "price": 23,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/steel.png?alt=media&token=286900d1-cdab-4395-a1fa-213f59b81794'
        },
        {
          "materialType": 'Copper',
          "price": 245,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/copper.png?alt=media&token=45423ace-aad4-4288-b72e-0f11115efb97'
        },
         {
          "materialType": 'Almunium',
          "price": 80,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/aluminium.png?alt=media&token=df6cb281-991b-42d3-8cf8-9e10381e59d5'
        },
         {
          "materialType": 'Iron',
          "price": 16,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/iron.png?alt=media&token=4a05f88b-3a00-46ba-a36e-171e025108ca'
        },
        {
          "materialType": 'Beer Bottles',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fbeer.png?alt=media&token=2bdf6db5-28b6-40d5-b4e6-a0a7bd94fda9'
        },
        {
          "materialType": 'Books',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Flaw-book.png?alt=media&token=80a70b79-8a73-4c69-91d4-96dfe2824ce7'
        },
        {
          "materialType": 'Brass',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fknuckles.png?alt=media&token=9be13a63-fa60-41ce-ad5b-4e188d987c83'
        },
        {
          "materialType": 'Carton (House)',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fopen-carton-box.png?alt=media&token=dc9bce4a-8d0b-48c4-8e48-98fe169e283c'
        },
        {
          "materialType": 'Carton (Shop)',
          "price": 5,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/carton.png?alt=media&token=737fd958-441d-48c2-9861-24dcb32bcf7a'
        },
        {
          "materialType": 'E-waste',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fewaste.png?alt=media&token=7f479fa2-b7e5-4c4e-9b0d-746d2cb9255f'
        },
        {
          "materialType": 'Fibre',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fmuscle.png?alt=media&token=00a2fb0f-786b-45e4-b9c8-b25c66e6f500'
        },
        {
          "materialType": ' Grey Board',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fbook-cover.png?alt=media&token=848d4127-d001-41b0-8708-bbf1c9b137f1'
        },
  
        {
          "materialType": 'Hard Plastic',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/plastic.png?alt=media&token=d8c635d2-54ca-466d-bbe0-b8c69aa81523'
        },
        {
          "materialType": 'Magazines',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fcommunications.png?alt=media&token=0b705a17-7f8b-4e44-b206-9f2686cf9858'
        },
        {
          "materialType": 'Mix Plastic',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Frecycling.png?alt=media&token=3bb9e6b6-5860-4611-bcee-aae95febee3c'
        },
        {
          "materialType": 'Mix-Waste',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fpaper-bin.png?alt=media&token=bb6f0eb3-2a23-465f-a976-6812d1fc3f5c'
        },
        {
          "materialType": 'Plastic Jar (15ltr)',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fpetrol.png?alt=media&token=f41a4e4d-eb99-48d0-b1a9-93e35690cdf0'
        },
        {
          "materialType": ' Plastic Jar (5ltr)',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fplastic-bottle.png?alt=media&token=d2b3439f-e4b6-4e02-afb9-949a9f38131d'
        },
        {
          "materialType": 'Polythene (Mix)',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fplastic-bag.png?alt=media&token=5e5301d9-2036-43b8-8fd3-6968fb9b1515'
        },
        {
          "materialType": 'Record Paper',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fplan.png?alt=media&token=a78903af-6045-4930-b5b5-d7fd17f39a1f'
        },
        {
          "materialType": 'Soft Plastic',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fbottles.png?alt=media&token=12bc6c35-2aaa-4dd7-b0ad-636b096d9023'
        },
        {
          "materialType": 'Water/Oil Covers',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Foil-container-outline-with-label.png?alt=media&token=20dbe7b3-f681-4466-8502-4f66dbc0eb62'
        },
        {
          "materialType": 'White Papers',
          "price": 3,
          "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/Rates%2Fcontract.png?alt=media&token=8d8c4515-e40c-4bcc-a091-4532db0f8bfd'
        },{
        "materialType": 'Tyre',
        "price": 3,
        "image":'https://firebasestorage.googleapis.com/v0/b/kabaadi-waala.appspot.com/o/tyre.png?alt=media&token=269468b4-10e9-446c-b5fd-8d5e6bc8ddf3'
      }
      ]
    }, function(error){
      if(error){
        console.log('write failed')
      }
      else{
        console.log('Data saved success')
      }
    }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
