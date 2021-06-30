import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentRoomData } from '../../actions/roomAction';

const Room = ({ getCurrentRoomData, auth, room }) => {
  useEffect(() => {
    getCurrentRoomData();
  }, []);

  console.log('room; outside useEffect', room);
  console.log('room; outside useEffect', room && room.day_name);
  console.log(
    'room; <==========>',
    room && room.menu.map((m) => console.log(m))
  );

  //   console.log('menu_name; outside useEffect', room.menu_name);
  //   console.log('menu; outside useEffect', room.menu);
  // room.menu.length > 0 &&
  //
  return (
    <div>
      {room &&
        room !== null &&
        room.menu !== null &&
        room.menu.length > 0 &&
        room.menu.map((room) => (
          <div>
            <h1>{room.open_for_order.toString()}</h1>
            <h1>{room.menu_name}</h1>
            <div>
              {room.menu_sections &&
                room.menu_sections.map((sec) => (
                  <div>
                    {sec.section_name.toString()}
                    {sec.menu_categories.map((cat) => (
                      <h1>
                        {cat.name}
                        <ul>
                          {cat.items.map((item) => (
                            <ul>
                              {/* <li>{item.name}</li>
                              <li><img  src={item.image} /></li>
                              <li>{item.comment_code}</li> */}
                            </ul>
                          ))}
                        </ul>
                      </h1>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );

  //   return <div>{profile.pr ofiles}</div>;
};

Room.prototype = {
  getCurrentRoomData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  room: state.roomReducer.payload,
});

export default connect(mapStateToProps, { getCurrentRoomData })(Room);
