import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ViewSegment.css';

function SegmentList() {
  const [segments, setSegments] = useState([]);
 axios.defaults.baseURL = 'https://crm-backend-umber.vercel.app';
  // Fetch data from API
  useEffect(() => {
    axios
      .get('/api/getsegments')
      .then((response) => setSegments(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle Send Campaign click
  const handleSendCampaign = async (segmentName) => {
    try {
      await axios.post(`/api/campaigns`, { segmentname: segmentName });
      alert('Campaign sent successfully!');
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert('Failed to send campaign');
    }
  };

  return (
    <div className="segment-list-container">
      <h2>Segment List</h2>
      <table className="segment-table">
        <thead>
          <tr>
            <th>Segment Name</th>
            <th>Number of Audience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((segment) => (
            <tr key={segment._id}>
              <td>{segment.segmentname}</td>
              <td>{segment.audience.length}</td> {/* Display audience count */}
              <td>
                <button onClick={() => handleSendCampaign(segment.segmentname)}>
                  Send Campaign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SegmentList;
