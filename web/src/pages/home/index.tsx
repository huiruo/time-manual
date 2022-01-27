import React from 'react'
import { Box } from '@fower/react'
import '../../style/common.scss'

const App =()=>{
  return (
    <Box>
     App 
     <div className='test-css'>
       <div className='test-css2'>test</div> 
     </div>
     <div style={{width:'20rem',height:'20rem',background:'green'}}>
       <div className='test-css2'>test</div> 
     </div>
    </Box>
  );
}

export default App;