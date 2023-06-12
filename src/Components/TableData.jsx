import React from 'react';

const TableData = ({
  data,
  toggleSidebar,
  handlePosition,
  handleSidebarType,
  handlePanelData,
}) => {
  return (
    <table className='border-collapse border border-black w-full text-left'>
      <thead className='bg-blue-300'>
        <tr>
          <th className='p-1 border border-gray-500'>Panel Name</th>
          <th className='p-1 border border-gray-500'>Mac Id</th>
          <th className='p-1 border border-gray-500'>Lat</th>
          <th className='p-1 border border-gray-500'>Long</th>
          <th className='p-1 border border-gray-500'>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((elem) => (
          <tr key={elem._id} className='border border-black '>
            <td
              className='p-1 border border-gray-500'
              onClick={() => {
                toggleSidebar();
                handleSidebarType(2);
                handlePanelData({
                  load: elem.r_load_status,
                  voltage: elem.r_volt_status,
                  pf: elem.r_pf_status,
                  mcb: elem.r_mcb_status,
                });
              }}
            >
              {elem.panel_name}
            </td>
            <td className='p-1 border border-gray-500'>{elem.mac_id}</td>
            <td className='p-1 border border-gray-500'>{elem.Lat}</td>
            <td className='p-1 border border-gray-500'>{elem.Lng}</td>
            <td className='p-1 border border-gray-500'>
              <button
                onClick={() => {
                  toggleSidebar();
                  handleSidebarType(1);
                  handlePosition([elem.Lat, elem.Lng], elem.panel_name);
                }}
              >
                🗺
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
