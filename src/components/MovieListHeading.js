import React from "react";

export default function MovieListHeading(props){
    return(
            <div className="col col-sm-4">
                <h1>{props.heading}</h1>
                <h4>{props.subheading}</h4>
            </div>
    
    )
}