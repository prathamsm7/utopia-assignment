import { useEffect, useState, useMemo } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Sidebar from './Components/Sidebar';
import TableData from './Components/TableData';

function App() {
  const [tableData, setTableData] = useState([]);
  const [position, setPosition] = useState([51.505, -0.09]);
  const [text, setText] = useState('A pretty CSS3 popup.');
  const [panelData, setPanelData] = useState({});

  const [sidebarType, setSidebarType] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      try {
        let res = await fetch(
          'https://uat.utopiatech.in:4520/panel/gettestlist?org_id=3'
        );
        let { result } = await res.json();

        setTableData([...result]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function handlePosition(value, textValue) {
    setPosition(value);
    setText(textValue);
    setSidebarType(1);
  }

  function handleSidebarType(value) {
    setSidebarType(value);
  }

  function handlePanelData({ load, voltage, pf, mcb }) {
    setPanelData({
      voltage,
      mcb,
      load,
      pf,
    });
  }

  return (
    <>
      <p className='text-2xl font-semibold text-cyan-700 my-2'>My Devices</p>
      {tableData && tableData.length > 0 ? (
        <>
          <TableData
            data={tableData}
            toggleSidebar={toggleSidebar}
            handlePosition={handlePosition}
            handleSidebarType={handleSidebarType}
            handlePanelData={handlePanelData}
          />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            position={position}
            text={text}
            sidebarType={sidebarType}
            panelData={panelData}
          />
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </>
  );
}

export default App;
