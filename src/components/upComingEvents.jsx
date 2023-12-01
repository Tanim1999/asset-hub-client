import { useState, useEffect } from 'react';

import { FaUser } from 'react-icons/fa';
import useTeamMembers from '../hooks/useTeamMembers';


const UpcomingEvents = () => {
  const [teamMembers] = useTeamMembers(); 
  console.log("zigzag",teamMembers)

  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

  useEffect(() => {
    if (teamMembers) {
      
      const currentMonth = new Date().getMonth() + 1; 
      const upcomingBirthdaysData = teamMembers.filter((user) => {
        const userBirthMonth = new Date(user.birthDay).getMonth() + 1;
        return userBirthMonth === currentMonth;
      });

     
      const today = new Date();
      const updatedData = upcomingBirthdaysData.map((user) => {
        const userBirthDate = new Date(user.birthDay);
        const remainingDays = Math.ceil(
          (userBirthDate - today) / (1000 * 60 * 60 * 24)
        );

       
        const remainingDaysMessage =
          remainingDays > 0
            ? `${remainingDays} days remaining`
            : 'Birthday already occurred';

        return {
          ...user,
          remainingDays: remainingDaysMessage,
        };
      });

      setUpcomingBirthdays(updatedData);
    }
  }, [teamMembers]);

  return (
    <div>
      
      <div>
            <h2 className='text-3xl text-[#175f82] font-bold text-center my-5'>Upcomming Events</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-[#175f82] text-white'>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Date of birth</th>
                            <th>Remaining days</th>
                        </tr>
                    </thead>
                    <tbody>
                    {upcomingBirthdays.map((user,index) => (
          <tr key={user._id}>
          <th>{index + 1}</th>
          <td> <div className="mask mask-squircle w-12 h-12">
              {user.photoURL ?
                  <><img src={user.photoURL} alt="Avatar Tailwind CSS Component" /></>
                  :
                  <><FaUser className="w-full h-full"></FaUser></>}

          </div></td>
          <td>{user.name}</td>
          <td>{user.birthDay}</td>
          <td>{user.remainingDays}</td>
          
          
      </tr>
        ))}
                    </tbody>
                </table>
            </div>



        </div>
      
    </div>
  );
};

export default UpcomingEvents;
