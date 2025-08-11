import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch properties for the owner
    axios
      .get("https://space-core.onrender.com/api/properties/") 
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Properties</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/owner-dashboard/add-property")}
      >
        Add New Property
      </button>

      {properties.length === 0 ? (
        <p>No properties found. Please add one.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Plot Number</th>
              <th>Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Rent Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop._id}>
                <td>{prop.plotNumber}</td>
                <td>{prop.title}</td>
                <td>{prop.propertyType}</td>
                <td>{prop.location}</td>
                <td>{prop.rentAmount}</td>
                <td>{prop.status}</td>
                <td>
                  <Link
                    to={`/owner-dashboard/edit-property/${prop._id}`}
                    className="btn btn-sm btn-secondary me-2"
                  >
                    Edit
                  </Link>
                  {/* You could add delete or view actions here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Properties;
