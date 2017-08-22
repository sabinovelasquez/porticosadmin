export default ngModule => {
  ngModule.service('firebaseAPIService', ($firebaseObject, $firebaseArray) => {
    const firebase = require('firebase');
    const firebaseClient = firebase.database().ref();
    const service = {
      getDevices: () => {
        const ref = firebaseClient.child('devices');
        const devices = $firebaseObject(ref);
        return devices.$loaded();
      },
      getEventDevices: (eventKey) => {
        const ref = firebaseClient.child(`devices`).orderByChild('settings/eventKey').equalTo(eventKey);
        const devices = $firebaseArray(ref);
        return devices.$loaded();
      },
      getEvents: () => {
        const ref = firebaseClient.child('events');
        const events = $firebaseObject(ref);
        return events.$loaded();
      },
      archiveEvent: (eventKey, bol) => {
        const ref = firebaseClient.child(`events/${eventKey}`);
        const setEvent = $firebaseObject(ref);
        setEvent.$loaded().then(() => {
          setEvent.archived = bol;
          return setEvent.$save();
        });
      },
      getEvent: (eventKey) => {
        const ref = firebaseClient.child(`events/${eventKey}`);
        const events = $firebaseObject(ref);
        return events.$loaded();
      },
      newEvent: (event) => {
        const ref = firebaseClient.child('events');
        const newEvent = $firebaseArray(ref);
        return newEvent.$add(event);
      },
      setDevice: (deviceId, eventKey) => {
        const ref = firebaseClient.child(`devices/${deviceId}/settings`);
        const setEvent = $firebaseObject(ref);
        setEvent.$loaded().then(() => {
          setEvent.eventKey = eventKey;
          return setEvent.$save();
        });
      },
      setEventData: (name, eventKey, percent) => {
        const ref = firebaseClient.child(`events/${eventKey}`);
        const setEvent = $firebaseObject(ref);
        setEvent.$loaded().then(() => {
          setEvent.title = name;
          setEvent.percent = percent;
          return setEvent.$save();
        });
      },
    };
    return service;
  });
};
