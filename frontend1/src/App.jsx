import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import WorkbookPage from './pages/WorkbookPage';
import IncomingPage from './pages/IncomingPage';
import LeadPage from './pages/LeadPage';
import AddIncomingDataPage from './pages/AddIncomingDataPage'; // Import the new page
import LeadUploadPage from './pages/LeadUploadPage';
import EditIncomingPage from './pages/EditIncomingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes using MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/workbook" element={<WorkbookPage />} />
          <Route path="/incoming" element={<IncomingPage />} />
          <Route path="/lead" element={<LeadPage />} />
        </Route>

        {/* Route without MainLayout */}
        <Route path="/addIncomingData" element={<AddIncomingDataPage />} />
        <Route path="/addLeadData" element={<LeadUploadPage />} />
        <Route path="/editIncomingItem/:id" element={<EditIncomingPage />} />
        {/* <Route path="/editIncomingItem/:id" element={<EditIncomingItem />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
