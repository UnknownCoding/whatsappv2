import React from 'react';
import {Circle} from 'better-react-spinkit';


const Loading = () => {
    return (
        <center style={{display:"grid"
                        ,placeItems:"center"
                        ,height:"100vh"
                        }}>
            <div>
                <img src='https://www.kindpng.com/picc/m/34-349854_whatsapp-chat-icon-hd-png-download.png'
                    alt="yes lad"
                    height={200}
                    style={{marginBottom:10}} 
                />
                <Circle color="#3CBC28" size={60}/>
            </div>
        </center>
    )
}

export default Loading