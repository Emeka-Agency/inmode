import React from "react";

export const format_title = (text = "", full_string = false) => {
    if(full_string) {
        return text.replace(/\*/g, '0').replace(' ', '').toLowerCase();
    }
    if(text.indexOf('*') > -1) {
        return (
            <>
                {text.split('*')[0]}
                <span style={{fontStyle: 'italic'}}>{text.split('*')[1]}</span>
            </>
        );
    }
    return text;
}