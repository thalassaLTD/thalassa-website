import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../components/Auth/Auth';
import { AuthContext } from '../Auth/Auth';

import amplitude from "amplitude-js";
amplitude.getInstance().init("caa10d0556acc367dc07e47338ce56f6");


function AmplitudeEvent(textLabel) {
    // const {textLabel} = props;
    const { currentUser } = useContext(AuthContext);
    console.log("referrer url", document.referrer);
    console.log("event::::::::", textLabel);

    const [ref, setRef] = useState(document.referrer);
    // App Opened
    // useEffect(() => {
    //     fetch("https://geolocation-db.com/json/")
    //         .then(response => {
    //             return response.json();
    //         }, "jsonp")
    //         .then(res => {
    //             console.log(res)
    //             amplitude.getInstance().logEvent("THALASSA - " + textLabel, {
    //                 user_id: res.IPv4,
    //                 mail: currentUser?.email,
    //                 name: currentUser?.displayName,
    //                 location_lat: res.latitude,
    //                 location_lng: res.longitude,
    //                 ip: res.IPv4,
    //                 event_properties: {
    //                     keyString: ref,
    //                     keyInt: 11,
    //                     keyBool: true
    //                 }
    //             });
    //         })
    //         .catch(err => console.log(err))
    // }, [])
}

export default AmplitudeEvent;

// import React, { useEffect } from "react";
// import amplitude from "amplitude-js";

// const AmplitudeTracker = (textLabel) => {
//   useEffect(() => {
//     // initialize Amplitude with your API key
//     amplitude.getInstance().init("134db46c6891a3c3aed764a5dc7d8eda");

//     // track click events with geolocation
//     const handleClick = (event) => {
//       const { target } = event;
//       const { tagName, href } = target;

//       if (tagName === "A") {
//         amplitude.getInstance().logEvent(textLabel, {
//           url: href,
//           city: "San Francisco", // replace with user's city using geolocation
//           region: "CA", // replace with user's state using geolocation
//           country: "USA" // replace with user's country using geolocation
//         });
//       }
//     };

//     // attach event listener to track clicks
//     document.addEventListener("click", handleClick);

//     return () => {
//       // remove event listener when component unmounts
//       document.removeEventListener("click", handleClick);
//     };
//   }, []);

//   return null; // this component doesn't render anything
// };

// export default AmplitudeTracker;