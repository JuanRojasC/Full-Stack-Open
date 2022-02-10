import React from "react";
import Part from "./Part";

const Content = (props) => {
    return(
        <>
            <Part part={part1} exercises={exercises1}/>
            <Part part={part2} exercises={exercises2}/>
            <Part part={part3} exercises={exercises3}/>
        </>
    );
}

export default Content;