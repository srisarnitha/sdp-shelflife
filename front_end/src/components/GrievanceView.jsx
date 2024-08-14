import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/GrievanceView.css';
import Header from './Header';
import Footer from './Footer';

const GrievanceView = () => {
  const [grievances, setGrievances] = useState([]);
  const [selectedGID, setSelectedGID] = useState(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get('http://localhost:8081/grievance-view');
        console.log(response);
        console.log(response.data);
        setGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();
  }, []);

  const handleResponseClick = (gId) => {
    setSelectedGID(gId);
  };

  const handleResponseSubmit = async () => {
    const updatedGrievance = grievances.find(grievance => grievance.gId === selectedGID);

    if (!updatedGrievance) {
      console.error('Grievance not found');
      return;
    }

    updatedGrievance.response = responseText;

    try {
      await axios.put(`http://localhost:8081/grievances/${selectedGID}`, updatedGrievance);
      setGrievances(grievances.map(grievance =>
        grievance.gId === selectedGID ? updatedGrievance : grievance
      ));
      setSelectedGID(null);
      setResponseText('');
    } catch (error) {
      console.error('Error updating grievance:', error);
    }
  };

  const handleResolvedToggle = (gId) => {
    const updatedGrievance = grievances.find(grievance => grievance.gId === gId);

    if (!updatedGrievance) {
      console.error('Grievance not found');
      return;
    }

    updatedGrievance.resolved = !updatedGrievance.resolved;

    axios.put(`http://localhost:8081/grievances/${gId}`, updatedGrievance)
      .then(() => {
        setGrievances(grievances.map(grievance =>
          grievance.gId === gId ? updatedGrievance : grievance
        ));
      })
      .catch(error => {
        console.error('Error updating grievance:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="grievance-container">
        <div className="grievance-table">
          <h2>Grievance Details</h2>
          <table>
            <thead>
              <tr>
                <th>GID</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Response</th>
                <th>Resolved</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map(grievance => (
                <tr key={grievance.gId}>
                  <td>{grievance.gId}</td>
                  <td>{grievance.uId}</td>
                  <td>{grievance.userName}</td>
                  <td>{grievance.subject}</td>
                  <td>{grievance.text}</td>
                  <td>
                    {grievance.response && <p>{grievance.response}</p>}
                    {!grievance.resolved && (
                      <>
                        {selectedGID === grievance.gId ? (
                          <>
                            <textarea
                              placeholder="Write your response here"
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                            ></textarea>
                            <button
                              className="response-button"
                              onClick={handleResponseSubmit}
                            >
                              Submit
                            </button>
                          </>
                        ) : (
                          <button
                            className="response-button"
                            onClick={() => handleResponseClick(grievance.gId)}
                          >
                            Respond
                          </button>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      className="resolved-button"
                      onClick={() => handleResolvedToggle(grievance.gId)}
                    >
                      {grievance.resolved ? '✔️' : '❌'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GrievanceView;