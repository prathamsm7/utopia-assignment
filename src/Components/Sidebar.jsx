import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import locationIcon from '../assets/location-icon.png';

const Sidebar = ({
  isOpen,
  onClose,
  position,
  text,
  sidebarType,
  panelData,
}) => {
  isOpen &&
    setTimeout(() => {
      document.querySelector('.leaflet-shadow-pane').remove();
      document.querySelector('.leaflet-marker-icon').src = locationIcon;
    }, 0);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='fixed right-0 top-0 h-full w-2/5 bg-white shadow-lg p-2'>
        {/* Sidebar content goes here */}

        {!isOpen ? (
          <p>Loading</p>
        ) : (
          <>
            <div className='w-full py-3 bg-cyan-500 text-white mb-2 flex justify-between px-2'>
              {sidebarType == 1 ? (
                <p className='font-bold'> Device Location</p>
              ) : (
                <p className='font-bold'> Device Status</p>
              )}
              <span className='cursor-pointer' onClick={onClose}>
                ❌
              </span>
            </div>
            {sidebarType == 1 ? (
              <>
                <MapContainer
                  center={position}
                  zoom={13}
                  className='w-full h-[500px]'
                >
                  <TileLayer
                    attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={position}>
                    <Popup>
                      {text}
                      <p>Latitude : {position[0]}</p>
                      <p>Longitude : {position[1]}</p>
                    </Popup>
                  </Marker>
                </MapContainer>
              </>
            ) : (
              <table className='border-collapse border border-black w-full text-left'>
                <thead className='bg-blue-300'>
                  <tr>
                    <th className='p-1 border border-gray-500'>Parameters</th>
                    <th className='p-1 border border-gray-500'>R Phase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-1 border border-gray-500'>
                      Voltage Status
                    </td>
                    <td className='p-1 border border-gray-500'>
                      {panelData.voltage}
                    </td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-gray-500'>MCB Status</td>
                    <td className='p-1 border border-gray-500'>
                      {panelData.mcb}
                    </td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-gray-500'>Load Status</td>
                    <td className='p-1 border border-gray-500'>
                      {panelData.load}
                    </td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-gray-500'>PF Status</td>
                    <td className='p-1 border border-gray-500'>
                      {panelData.pf}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
