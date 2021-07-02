import { useState } from 'react';
import styles from './index.css';
import { useLocalStorageState } from 'ahooks';
import axios from 'axios';

function BasicLayout(props) {
  const [dbName, setDbName] = useLocalStorageState('db', 'bridge_test0xea25d3c7faa1ed1d1645bf4b5a0bbe35e94a3607');
  const [colName, setColName] = useLocalStorageState('col', 'event');
  const [keyName, setKeyName] = useLocalStorageState('key', 'hashX');
  const [value, setValue] = useLocalStorageState('value', '0xde515b2409729af21e42361628b4a2103be5b6b2aad0111d5f62249dbc4889a8');
  const [retVal, setRetVal] = useState('');
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Query Mongo Data</h1>

      <h3>Database Name:</h3>
      <input style={{width:"400px"}} value={dbName} onChange={e=>setDbName(e.target.value)} />

      <h3>Collection:</h3>
      <input style={{width:"400px"}} value={colName} onChange={e=>setColName(e.target.value)} />

      <h3>Key Name:</h3>
      <input style={{width:"400px"}} value={keyName} onChange={e=>setKeyName(e.target.value)} />

      <h3>Value:</h3>
      <input style={{width:"400px"}} value={value} onChange={e=>setValue(e.target.value)}/>

      <div />
      <button style={{margin:"20px", width:"120px"}} onClick={()=>{
        setRetVal('');
        axios.get('http://44.233.241.210:9000/read?db=' +dbName+ '&col=' +colName+ '&name=' + keyName + '&value=' + value).then(ret=>{
          console.log(ret.data);
          setRetVal(JSON.stringify(ret.data, null, 2));
        }).catch(console.error)
      }}>Read</button>

      <h3>Return:</h3>
      <textarea rows="40" cols="100" value={retVal} readOnly />
    </div>
  );
}

export default BasicLayout;
