import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentRoomData } from '../../actions/roomAction';

const Room = ({ getCurrentRoomData, roomData,auth }) => {
  useEffect(() => {
    getCurrentRoomData();
  }, []);

  console.log('room; outside useEffect', roomData);
  console.log('room; outside useEffect', roomData && roomData.day_name);
  console.log(
    'room; <==========>',
    roomData && roomData.menu.map((m) => console.log(m))
  );

  //   console.log('menu_name; outside useEffect', room.menu_name);
  //   console.log('menu; outside useEffect', room.menu);
  // room.menu.length > 0 &&

  return (
    roomData !== null &&
    roomData.menu !== null &&
    roomData.menu.length > 0 &&
    roomData.menu.map((room) => <div>{room}</div>)
  );

  //   return <div>{profile.pr ofiles}</div>;
};

Room.prototype = {
  getCurrentRoomData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  roomData: state.roomReducer.payload,
});

export default connect(mapStateToProps, { getCurrentRoomData })(Room);
