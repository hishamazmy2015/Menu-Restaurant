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
      {room && room !== null && room.menu !== null && room.menu.length > 0 && (
        <li>
          <img src={room.info.image_url} />
          <img src={room.info.logo_url} />
        </li>
      )}

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
                            <div>
                                <ul>
                                  <li>{item.name}</li>
                                  <li>
                                    <div style={{}}>
                                      {item.image ? (
                                        <img
                                          style={{ width: 150, height: 150 }}
                                          src={item.image}
                                        />
                                      ) : (
                                        <img
                                          style={{ width: 150, height: 150 }}
                                          src='https://dxp-hospitality-dev-rg-sit-467300-cd2.azurewebsites.net//-/mediadh/dh/hospitality/e-menu/menus/alnpool/96178.jpg'
                                        />
                                      )}
                                      <li>{item.price}</li>
                                    </div>
                                  </li>
                                  {/* <li>{item.comment_code}</li> */}
                                </ul>
                                
                              <div class='d-flex justify-content-between align-items-center mt-3 p-2 items rounded'>
                                <div class='d-flex flex-row align-items-center'>
                                  <a
                                    class='action-btns add'
                                    title='Add number of items'
                                  >
                                    +
                                  </a>
                                  <span class='d-block'>{item.name}</span>
                                  <a
                                    class='action-btns minus'
                                    title='remove number of items'
                                  >
                                    -
                                  </a>
                                </div>

                                
                              </div>
                            </div>
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
