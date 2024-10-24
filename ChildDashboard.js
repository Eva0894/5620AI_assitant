import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

const ChildDashboard = () => {
  const { id } = useParams(); // 获取child的id
  const [username, setUsername] = useState('');
  const [elders, setElders] = useState([]);
  const [selectedElder, setSelectedElder] = useState('');
  const [newElderId, setNewElderId] = useState(''); // 用于存储新 elder ID
  const [linkMessage, setLinkMessage] = useState(''); // 用于存储账户关联成功信息
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildInfo = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', id);
      if (data && data.length > 0) {
        setUsername(data[0].name);
      }
    };

    const fetchElders = async () => {
      const { data: elderLinks, error } = await supabase
        .from('elder_child_link')  // 先查询关联表
        .select('elder_id')
        .eq('child_id', id);
    
      if (elderLinks && elderLinks.length > 0) {
        const elderIds = elderLinks.map(link => link.elder_id); // 提取 elder_id 列表
        const { data: elderDetails, error: elderError } = await supabase
          .from('users')  // 在 users 表中查询 elders 的详细信息
          .select('id, name')
          .in('id', elderIds);
    
        if (elderDetails) {
          setElders(elderDetails); // 设置 elders 为查询到的 elder 详情
          setSelectedElder(elderDetails[0]?.id || ''); // 默认选择第一个 elder
        }
      }
    };
    
    fetchChildInfo();
    fetchElders();
  }, [id]);

  const handleElderChange = (event) => {
    setSelectedElder(event.target.value);
  };

  const handleViewReport = (reportType) => {
    if (selectedElder) {
      navigate(`/${reportType}-report/${selectedElder}`);
    }
  };

  const handleNewElderLink = async () => {
    if (newElderId) {
      const { data, error } = await supabase
        .from('elder_child_link')
        .insert([{ elder_id: newElderId, child_id: id }]);

      if (!error) {
        setLinkMessage('Account successfully linked'); // 显示成功信息
        setNewElderId(''); // 清空输入框
        // 重新获取 elders 列表
        const { data: elderLinks, error: elderError } = await supabase
          .from('elder_child_link')
          .select('elder_id')
          .eq('child_id', id);
        
        if (elderLinks && elderLinks.length > 0) {
          const elderIds = elderLinks.map(link => link.elder_id);
          const { data: elderDetails } = await supabase
            .from('users')
            .select('id, name')
            .in('id', elderIds);
          
          if (elderDetails) {
            setElders(elderDetails);
          }
        }
      } else {
        setLinkMessage('Failed to link account');
      }
    }
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    if (window.location.pathname !== `/child-dashboard/${id}`) {
      navigate(`/child-dashboard/${id}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Hi, {username}!</h1>
        <button style={styles.squareButton} onClick={handleNavigateToProfile}>Me</button>
        <button style={styles.squareButton} onClick={handleHomeClick}>Home</button>
      </div>

      <div style={styles.linkNewElder}>
        <label htmlFor="new-elder-id">Link New Elder Account: </label>
        <input
          id="new-elder-id"
          type="int"
          value={newElderId}
          onChange={(e) => setNewElderId(e.target.value)}
          placeholder="Enter elder ID"
        />
        <button onClick={handleNewElderLink} style={styles.addButton}>Add</button>
        {linkMessage && <p>{linkMessage}</p>}
      </div>
      
      <div style={styles.content}>
        <label htmlFor="elder-select">Choose Elder: </label>
        <select id="elder-select" value={selectedElder} onChange={handleElderChange} style={styles.select}>
          <option value="">--Select Elder--</option>
          {elders.map((elder) => (
            <option key={elder.id} value={elder.id}>
              {elder.name}
            </option>
          ))}
        </select>

        {selectedElder && (
          <div style={styles.buttonContainer}>
            <button style={styles.roundButton} onClick={() => handleViewReport('health')}>Health Report</button>
            <button style={styles.roundButton} onClick={() => handleViewReport('emotion')}>Emotion Report</button>
            <button style={styles.roundButton} onClick={() => handleViewReport('emergency')}>Emergency Report</button>
            <button style={styles.roundButton} onClick={() => handleViewReport('others')}>Others Report</button>
          </div>
        )}
      </div>
      
      <footer style={styles.footer}>
        <p>Contact Us: xche0894@uni.sydney.edu.au</p>
        <p>Feel Free to Give Us Your Advice!</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  linkNewElder: {
    marginTop: '20px',
    textAlign: 'center',
  },
  addButton: {
    padding: '10px 20px',
    marginLeft: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  content: {
    textAlign: 'center',
    marginTop: '20px',
  },
  select: {
    fontSize: '16px',
    padding: '10px',
    borderRadius: '8px',
    margin: '20px 0',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  roundButton: {
    padding: '20px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    width: '120px',
    height: '120px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  squareButton: {
    padding: '12px 24px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px',
  },
  footer: {
    textAlign: 'center',
    color: 'gray',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },
};

export default ChildDashboard;
