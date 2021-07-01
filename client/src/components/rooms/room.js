import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from './Tabs';
import Tab from './Tab';
import PropTypes from 'prop-types';
import { getCurrentRoomData } from '../../actions/roomAction';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Room = ({ getCurrentRoomData, auth, room }) => {
  useEffect(() => {
    getCurrentRoomData();
  }, []);
  return (
    <div>
      <div className='col-6'></div>
      <div>
        Your <FontAwesomeIcon icon='coffee' /> is hot and ready!
      </div>

      {room && room !== null && room.menu !== null && room.menu.length > 0 && (
        <div style={{ margin: '3%', position: 'relative' }}>
          <h1
            style={{
              // margin: '3%',
              // position: 'relative',
              position: 'absolute',
              top: '30px',
              left: '20px',
              color: 'white',
              style: 'font-family:verdana;',
            }}
          >
            Jumeirah
          </h1>
          <img src={room.info.image_url} />
          <span class='d-block'>
            <h1
              style={{
                // margin: '3%',
                // position: 'relative',
                position: 'absolute',
                top: '470px',
                left: '20px',
                color: 'white',
              }}
            >
              In Room Dining
            </h1>
          </span>
        </div>
      )}
      <Tabs>
        {room &&
          room !== null &&
          room.menu !== null &&
          room.menu.length > 0 &&
          room.menu.map((room) => (
            <div>
              <h3
                style={{
                  position: 'absolute',
                  right: '50%',
                  margin: 'auto',
                }}
              >
                <p
                  style={{
                    // 'font-family': 'Cursive',
                    // ' font-size': '300%',
                    // color: '',
                    'font-family': 'Cursive',
                  }}
                >
                  {room.menu_name}
                </p>
              </h3>

              <div>
                {room.menu_sections &&
                  room.menu_sections.map((sec) => (
                    <div>
                      {sec.menu_categories.map((cat) => (
                        <div className='card-body'>
                          <Tab value={cat.name} header={cat.name}>
                            {cat.name}
                            <ul>
                              {cat.items.map((item) => (
                                <div class='d-flex justify-content-between align-items-center mt-3 p-2 items rounded'>
                                  <div class='d-flex flex-row align-items-center'>
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
                                        {item.image ? (
                                          <Image
                                            className='img-cycle'
                                            roundedCircle
                                            style={{
                                              width: 100,
                                              height: 100,
                                            }}
                                            src={item.image}
                                          />
                                        ) : (
                                          <Image
                                            className='img-fluid'
                                            roundedCircle
                                            style={{
                                              width: 100,
                                              height: 100,
                                            }}
                                            roundedCircle
                                            src='https://dxp-hospitality-dev-rg-sit-467300-cd2.azurewebsites.net//-/mediadh/dh/hospitality/e-menu/menus/alnpool/96178.jpg'
                                          />
                                        )}

                                        <span class='d-block'>
                                          <li>
                                            <p
                                              style={{
                                                'font-family': 'Cursive',
                                                ' font-size': '300%',
                                              }}
                                            >
                                              {item.name}
                                            </p>
                                          </li>
                                          <li>{item.price}</li>
                                          <li>{item.description}</li>
                                        </span>
                                      </ul>
                                    </li>
                                  </div>
                                </div>
                              ))}
                            </ul>
                          </Tab>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        <Tab value='All Day' header='All Day'>
          All Days
        </Tab>
        <Tab value='Drinks' header='Drinks'>
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
