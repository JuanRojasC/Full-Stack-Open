import React from "react";
import { Content } from "./Content";
import { Header } from "./Header";

/*Separe Module*/
const Course = ({course}) => {
    return(
        <>
            <Header text={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course;