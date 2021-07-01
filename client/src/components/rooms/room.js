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
          {/* <img src={room.info.image_url} /> */}
          {/* <img src={room.info.logo_url} /> */}
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
                  right: '50%',
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
                      key={sec.id}
                      value='banana' header={sec.section_name.toString()}
                      {sec.menu_categories.map((cat) => (
                        <Tab value={cat.name} header={cat.name}>
                          {cat.name}
                          <ul>
                            {cat.items.map((item) => (
                              <div class='d-flex justify-content-between align-items-center mt-3 p-2 items rounded'>
                                <div class='d-flex flex-row align-items-center'>
                                  {/* <ul class='columns' data-columns='2'> */}

                                  <li>
                                    <ul
                                      class='columns'
                                      data-columns='2'
                                      style={{
                                        display: 'grid',
                                        'grid-template-columns':
                                          '1fr 3fr 1fr  ',
                                        'grid-template-rows':
                                          '50px auto 70px  ',
                                      }}
                                    >
                                      {/* <li> */}
                                      {item.image ? (
                                        <img
                                          style={{
                                            width: 100,
                                            height: 100,
                                          }}
                                          src={item.image}
                                        />
                                      ) : (
                                        <img
                                          style={{
                                            width: 100,
                                            height: 100,
                                          }}
                                          src='https://dxp-hospitality-dev-rg-sit-467300-cd2.azurewebsites.net//-/mediadh/dh/hospitality/e-menu/menus/alnpool/96178.jpg'
                                        />
                                      )}

                                      <span class='d-block'>
                                        <li>{item.name}</li>
                                        <li>{item.price}</li>
                                      </span>
                                    </ul>
                                  </li>
                                </div>
                              </div>
                            ))}
                          </ul>
                        </Tab>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        <Tab value='apple50' header='All Days 50'>
          All Days sss
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
