import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ViewCampaigns.css'; // Import CSS file for styling

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
 axios.defaults.baseURL = 'https://crm-backend-umber.vercel.app';
  // Fetch data from API
  useEffect(() => {
    axios
      .get('/api/getcampaigns')  // Adjust the API endpoint as needed
      .then((response) => setCampaigns(response.data))
      .catch((error) => console.error('Error fetching campaigns:', error));
  }, []);

  return (
    <div className="campaign-list-container">
      <h2>Campaign List</h2>
      <div className="campaign-cards">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="campaign-card">
            <h3>{campaign.campaignName}</h3>
            <p><strong>Number of Audience:</strong> {campaign.audienceSize}</p>
            <p><strong>Number Sent:</strong> {campaign.numberSent}</p>
            <p><strong>Number Failed:</strong> {campaign.numberFailed}</p>
            <p><strong>Message:</strong> {campaign.message}</p>
            <p><strong>Sent Date:</strong> {new Date(campaign.sentDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampaignList;
