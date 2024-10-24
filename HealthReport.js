import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

const HealthReport = () => {
  const { elderId } = useParams();
  const [report, setReport] = useState(null);
  const [elderName, setElderName] = useState(''); // 用于存储elder名字
  const [loading, setLoading] = useState(true); // 加载状态
  const navigate = useNavigate(); // 初始化 navigate

  useEffect(() => {
    const fetchElderName = async () => {
        const { data, error } = await supabase
          .from('users')  // 假设 elder 的信息存储在 users 表
          .select('name')
          .eq('id', elderId);
          
        if (data && data.length > 0) {
          setElderName(data[0].name); // 设置 elder 的名字
        }
    };

    const fetchHealthReport = async () => {
        const { data, error } = await supabase
            .from('report')  // 从 report 表中获取健康报告
            .select('*')
            .eq('elder_id', elderId)
            .eq('type', 'health');  // 筛选健康报告类型
    
        setLoading(false);  
        if (data && data.length > 0) {
            setReport(data[0]); // 假设每个 elder 只有一个健康报告
        }
    };

    fetchElderName(); // 获取 elder 的名字
    fetchHealthReport();
  }, [elderId]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Health Report for Elder {elderName}</h1>
      <div style={styles.reportContainer}>
        {report ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Health Report</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.tableData}>{report.report}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p style={styles.noRecords}>No related report found</p>
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

export default HealthReport;