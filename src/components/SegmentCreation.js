import React, { useState } from 'react';  
import axios from 'axios';  
import '../SegmentCreation.css';

function SegmentCreation() {  
  const [segmentName, setSegmentName] = useState('');  
  const [totalSpending, setTotalSpending] = useState('');  
  const [visits, setVisits] = useState('');  
  const [lastVisit, setLastVisit] = useState('');  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    
    const segmentData = {  
      name: segmentName,  
      totalSpending: totalSpending,  
      visits: visits,  
      lastVisit: lastVisit  
    };  

    try {  
      // Replace this URL with your actual API endpoint  
      axios.defaults.baseURL = 'https://crm-backend-umber.vercel.app';
      const response = await axios.post('/api/segments', segmentData);  
      alert('Segment created successfully: ' + JSON.stringify(response.data));  
      // Reset form fields  
      setSegmentName('');  
      setTotalSpending('');  
      setVisits('');  
      setLastVisit('');  
    } catch (error) {  
      console.log('Error creating segment:', error);  
      alert('Error creating segment: ' + error.message);  
    }  
  };  

  return (  
    <div className="segment-creation-container">  
      <h2>Create Audience Segment</h2>  
      <form onSubmit={handleSubmit}>  
        <input  
          type="text"  
          placeholder="Segment Name"  
          value={segmentName}  
          onChange={(e) => setSegmentName(e.target.value)}  
          required  
        />  
        <input  
          type="number"  
          placeholder="Total Spending (> 10000)"  
          value={totalSpending}  
          onChange={(e) => setTotalSpending(e.target.value)}   
        />  
        <input  
          type="number"  
          placeholder="Visits (<= 3)"  
          value={visits}  
          onChange={(e) => setVisits(e.target.value)}  
        />  
        <input  
          type="number"  
          placeholder="Last Visit (days since last visit, > 90)"  
          value={lastVisit}  
          onChange={(e) => setLastVisit(e.target.value)}  
        />  
        <button type="submit">Create Segment</button>  
      </form>  
    </div>  
  );  
}  

export default SegmentCreation;
