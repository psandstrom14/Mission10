import { useEffect, useState } from 'react';

// Define the shape of our data so TypeScript knows what to expect
type Bowler = {
  bowlerId: number;
  firstName: string;
  middleInit: string | null;
  lastName: string;
  teamName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
};

const BowlerList = () => {
  const [bowlers, setBowlers] = useState<Bowler[]>([]);

  useEffect(() => {
    const fetchBowlerData = async () => {
      // CRITICAL: Replace 5000 with the actual port your ASP.NET API is running on!
      const response = await fetch('http://localhost:5000/api/bowlers');
      const data = await response.json();
      setBowlers(data);
    };

    fetchBowlerData();
  }, []);

  return (
    <div className="container">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Team Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((b) => (
            <tr key={b.bowlerId}>
              {/* Combine First, Middle (if it exists), and Last Name */}
              <td>
                {b.firstName} {b.middleInit ? `${b.middleInit}. ` : ''}{b.lastName}
              </td>
              <td>{b.teamName}</td>
              <td>{b.address}</td>
              <td>{b.city}</td>
              <td>{b.state}</td>
              <td>{b.zip}</td>
              <td>{b.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BowlerList;