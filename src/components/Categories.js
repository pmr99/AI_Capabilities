import React from 'react';
import './style.css'

const Categories = (props) => {
    const [html, setHtml] = React.useState(null);
    const clickme = (props) => {
         return(Object.entries(props).map(([key,value]) =>
            <p className = 'button-74' style={ value ? {color: 'green'} : {color: 'red' }}>
                {key}
            </p>
            ));
    }
    return(        
        <div>        
            <button className = 'button-36' onClick={(() => setHtml(clickme(props.title)))}>{props.category}</button>
            {html}
        </div>
    );
};


export default Categories