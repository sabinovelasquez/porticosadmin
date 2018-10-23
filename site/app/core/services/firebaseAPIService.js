export default ngModule => {
  ngModule.service('firebaseAPIService', ($firebaseObject, $firebaseArray) => {
    const firebase = require('firebase');
    const firebaseClient = firebase.database().ref();
    const service = {
      getUsers: () => {
        const ref = firebaseClient.child('users');
        const users = $firebaseObject(ref);
        return users.$loaded();
      },
      storeUser: (uid, data) => {
        const ref = firebaseClient.child(`users/${uid}`);
        const newUser = $firebaseObject(ref);
        newUser.$loaded().then(() => {
          newUser.data = data;
          return newUser.$save();
        });
      },
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
      deleteEvent: (eventKey) => {
        const ref = firebaseClient.child(`events/${eventKey}`);
        const deleteEvent = $firebaseObject(ref);
        return deleteEvent.$remove();
      },
      getEvent: (eventKey) => {
        const ref = firebaseClient.child(`events/${eventKey}`);
        const event = $firebaseObject(ref);
        return event.$loaded();
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
      updateDevice: (deviceId) => {
        const ref = firebaseClient.child(`devices/${deviceId}`);
        const upDevice = $firebaseObject(ref);
        return upDevice.$loaded();
      },
      setEventData: (name, eventKey, percent, days) => {
        const ref = firebaseClient.child(`events/${eventKey}`);
        const setEvent = $firebaseObject(ref);
        setEvent.$loaded().then(() => {
          setEvent.title = name;
          setEvent.percent = percent;
          setEvent.days = days;
          return setEvent.$save();
        });
      },
      setEventList: (eventKey) => {
        const ref = firebaseClient.child(`events/${eventKey}`);
        const setEvent = $firebaseObject(ref);
        return setEvent.$loaded();
      },
      storeInvite: (eventKey) => {
        const ref = firebaseClient.child(`events/${eventKey}/list`);
        const newUser = $firebaseObject(ref);
        return newUser.$loaded();
      },
    };
    return service;
  });
};
