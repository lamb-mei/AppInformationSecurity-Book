import { useEffect, useState } from 'react';

import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

   

const HMAC = () => {
    const [data, setData] = useState([]);
   
 

    const message = "咩"
    const key = "key"
    let hmac = hmacSHA256(message , key )
    const hmacHex = hmac.toString();


    return (
        <>
        HMAC {hmacHex}
        </>
    );
}

export default HMAC;