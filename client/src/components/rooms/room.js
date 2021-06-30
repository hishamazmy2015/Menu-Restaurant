import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from './Tabs';
import Tab from './Tab';
import PropTypes from 'prop-types';
import { getCurrentRoomData } from '../../actions/roomAction';

const Room = ({ getCurrentRoomData, auth, room }) => {
  useEffect(() => {
    getCurrentRoomData();
  }, []);

  return (
    <div>
      {room && room !== null && room.menu !== null && room.menu.length > 0 && (
        <li>
          <img src={room.info.image_url} />
          <img src={room.info.logo_url} />
        </li>
      )}
      <Tabs>
        {room &&
          room !== null &&
          room.menu !== null &&
          room.menu.length > 0 &&
          room.menu.map((room) => (
            <div>
              <h1
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  margin: 'auto',

                }}
              >
                {room.menu_name}
              </h1>

              <div>
                {room.menu_sections &&
                  room.menu_sections.map((sec) => (
                    <div>
                      {/* {sec.section_name.toString()} */}
                      <Tab value='banana' header={sec.section_name.toString()}>
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
                      </Tab>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        <Tab value='apple' header='All Days'>
          All Days
        </Tab>
        <Tab value='apple' header='Drinks'>
          Drinks
        </Tab>
      </Tabs>
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
