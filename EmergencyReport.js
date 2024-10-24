import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

const EmergencyReport = () => {
  const { elderId } = useParams(); // 获取URL中的elderId参数
  const [reports, setReports] = useState([]);
  const [elderName, setElderName] = useState('');
  const [loading, setLoading] = useState(true); // 用于显示加载状态
  const [noRecords, setNoRecords] = useState(false); // 用于显示“没有记录”的状态
  const navigate = useNavigate(); // 初始化 navigate

  useEffect(() => {
    // 获取 Elder 名字
    const fetchElderName = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', elderId);

      if (data && data.length > 0) {
        setElderName(data[0].name);
      }
    };

    // 获取 Emergency 报告
    const fetchEmergencyReports = async () => {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString();

      const { data, error } = await supabase
        .from('emergency_report')
        .select('*')
        .eq('elder_id', elderId)
        .gte('created_at', startOfMonth)
        .lte('created_at', endOfMonth);

      setLoading(false);

      if (data && data.length > 0) {
        setReports(data);
      } else {
        setNoRecords(true);
      }
    };

    fetchElderName();
    fetchEmergencyReports();
  }, [elderId]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Emergency Report for Elder {elderName}</h1>
      <div style={styles.reportContainer}>
        {noRecords ? (
          <p style={styles.noRecords}>No emergency records for this month</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Emergency Times</th>
                <th style={styles.tableHeader}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.num}>
                  <td style={styles.tableData}>
                    {report.emergency_time.split('\n').map((time, index) => (
                      <div key={index}>- {time.trim()}</div>
                    ))}
                  </td>
                  <td style={styles.tableData}>{report.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button style={styles.homeButton} onClick={() => navigate(-1)}>Home</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  reportContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    width: '100%',
    maxWidth: '800px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  tableData: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  noRecords: {
    fontSize: '18px',
    color: '#999',
    textAlign: 'center',
  },
  loading: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default EmergencyReport;
