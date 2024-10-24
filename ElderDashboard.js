import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';
import './elderboard.css';

const ElderDashboard = () => {
    const { id: elderId } = useParams(); 
    const [inquiries, setInquiries] = useState([]);
    const [inquiryType, setInquiryType] = useState('health');
    const [checkinStatus, setCheckinStatus] = useState(null);
    const navigate = useNavigate();
    const [volunteerNumbers, setVolunteerNumbers] = useState([]);

    const handleProfileClick = () => {
        navigate('/profile'); 
      };

    const handleEmergencyCall = async () => {
        try {
            const elderIdNumber = parseInt(elderId, 10)
            // get child_id
            const { data: links, error: linkError } = await supabase
                .from('elder_child_link')
                .select('child_id')
                .eq('elder_id', elderId);

            if (linkError) {
                console.error('Error fetching child links:', linkError);
                return;
            }
            console.log('Links found:', links);

            if (!links || links.length === 0) {
                console.log('No child links found for elderId:', elderId);
                alert('No emergency contacts found.');
                return;
            }
            // get all linked child_id
            const childIds = links.map(link => link.child_id);
            console.log('Child IDs found:', childIds);
            // get name and phone number
            const { data: children, error: userError } = await supabase
                .from('users')
                .select('name, phone_number')
                .in('id', childIds);

            if (userError) {
                console.error('Error fetching child details:', userError);
                return;
            }
            console.log('Child details found:', children);
            if (!children || children.length === 0) {
                console.log('No child details found for child IDs:', childIds);
                alert('No emergency contacts found.');
                return;
            }
            // Pop-up
            const childDetails = children.map(child => `${child.name}: ${child.phone_number}`).join('\n');
            alert(`Emergency Contacts:\n${childDetails}`);

        } catch (err) {
            console.error('Error during emergency call handling:', err);
        }
    };

    const handleCheckin = async () => {
        try {
            console.log('Elder ID:', elderId);
            const currentDate = new Date(); 
            const today = currentDate.toISOString().split('T')[0];
            const { data: existingData, error: selectError } = await supabase
                .from('daily_checkin')
                .select('*')
                .eq('elder_id', elderId)
                .gte('date', today);

            if (selectError) {
                console.error('Error checking existing check-ins:', selectError);
                setCheckinStatus('Error checking existing check-ins.');
                return;
            }
            if (existingData && existingData.length > 0) {
                setCheckinStatus('You have already checked in today.');
            } else {
                const { data, error } = await supabase
                    .from('daily_checkin')
                    .insert([{ elder_id: elderId, checkin: true, date: currentDate }]);
    
                if (error) {
                    console.error('Error during check-in:', error);
                    setCheckinStatus('Error during check-in.');
                } else {
                    setCheckinStatus('Check-in successful!');
                }
            }
        } catch (err) {
            console.error('Error during check-in:', err);
            setCheckinStatus('Check-in failed.');
        }
    };
    useEffect(() => {
        const checkMissedCheckins = async () => {
            const currentDate = new Date();
            const currentHour = currentDate.getHours();
            const currentMinutes = currentDate.getMinutes();

            if ((currentHour === 9 && currentMinutes === 0) || 
                (currentHour === 18 && currentMinutes === 0)) {

                const { data, error } = await supabase
                    .from('daily_checkin')
                    .select()
                    .eq('elder_id', elderId)
                    .gte('date', currentDate); 

                if (error) {
                    console.error('Error checking missed check-ins:', error);
                } else if (data.length === 0) {
                    const { insertError } = await supabase
                        .from('daily_checkin')
                        .insert([{ elder_id: elderId, checkin: false, date: currentDate }]);

                    if (insertError) {
                        console.error('Error inserting missed check-in:', insertError);
                    } else {
                        console.log('Missed check-in recorded.');
                    }
                }
            }
        };

        const intervalId = setInterval(checkMissedCheckins, 60000); //60s

        return () => clearInterval(intervalId);
    }, []);

    const fetchVolunteerNumbers = async () => {
        try {
            const { data, error } = await supabase
                .from('volunteer')
                .select('phone_number')
                .order('id', { ascending: false }) 
                .limit(3); 

            if (error) {
                console.error('Error fetching volunteer numbers:', error);
            } else {
                const phoneNumbers = data.map(v => v.phone_number);
                // setVolunteerNumbers(data.map(v => v.phone_number)); 
                alert(`Volunteer Numbers: ${data.map(v => v.phone_number).join(', ')}`); 
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const { data, error } = await supabase
                    .from('ai_inquiry')
                    .select('inquiry')  
                    .eq('id', elderId)
                    .eq('inquiry_date', today)
                    .eq('inquiry_type', inquiryType);
        
                if (error) {
                    console.error('Error fetching inquiries:', error);  
                } else {
                    console.log('Fetched data:', JSON.stringify(data, null, 2)); 
                    setInquiries(data);  
                }
            } catch (err) {
                console.error('An unexpected error occurred:', err);
            }
        };
        

        fetchInquiries();
    }, [inquiryType, elderId]);

    return (
        <div className="elderdashboard">
            <button onClick={handleCheckin}>check in</button>
            {checkinStatus && <p>{checkinStatus}</p>}
            <h2>Today's Inquiry</h2>
            <label htmlFor="inquiryTypeSelect">
                Select Inquiry Type:
                <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                >
                    <option value="health">Health</option>
                    <option value="emotion">Emotion</option>
                    <option value="others">Others</option>
                </select>
            </label>
            <div className='inquiry-container'>
                {inquiries.length > 0 ? (
                    <ul>
                        {inquiries.map((inquiry, index) => (
                            <li key={index}>
                                {inquiry.inquiry}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No inquiries for the selected type.</p>
                )}
            </div>
            <div className='card-container'>
                <div className='card'>
                    <img 
                        src="https://pivotalhealth.com.au/wp-content/uploads/2014/07/NewsDigest_logo.jpg" 
                        className="circle-image" 
                        alt="Today News" 
                        onClick={() => window.location.href='https://www.news.com.au/'}
                    />
                    <p className='name'>Today News</p>
                </div>
                <div className="card">
                    <img 
                        src="https://studyadelaide.com/storage/app/media/life/discover-adelaide/things-to-do/shopping/shopping-1300x1300.jpg" 
                        className="circle-image" 
                        alt="Shopping" 
                        onClick={() => navigate('/shopping')}
                    />
                    <p className='name'>Shopping</p>
                </div>
                <div className="card">
                    <img 
                        src="https://womenwhocycle.com/wp-content/uploads/2023/01/Volunteer-768x433.jpg" 
                        className="circle-image" 
                        alt="Volunteer Help" 
                        onClick={fetchVolunteerNumbers}
                    />
                    <p className='name'>Volunteer Help</p>
                </div>
            </div>
            <div className="fixed-buttons">
                <button onClick={handleProfileClick}>Me</button>
                <button onClick={() => console.log('Home button clicked')}>Home</button>
                <button onClick={handleEmergencyCall}>Emergency Call</button>
            </div>
            

            <div className='contact'>
                <p>Contact Us: xche0894@uni.sydney.edu.au</p>
                <p>Flee Free to Give Us Your Advice!</p>
            </div>
        </div>
    );    
};

export default ElderDashboard;
