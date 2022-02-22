import React from 'react'
import { Part } from './Part'

export const Content = ({parts}) => {

    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <b>total of {parts.reduce((a, b) => a + b.exercises, 0)} excercises</b>
        </div>
    )
}