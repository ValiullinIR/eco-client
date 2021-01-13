import React from 'react'

export const Activity = ({
    name,
    var_name,
    key_words
}) => {
    return (
        <div className="activity">
            <h4 className="activity__header">{title}</h4>
            <span className="activity__leader">{leader}</span>
            <div className="activity__image">
                <img className="activity__image__img" src={image} />
            </div>
            <div className="activity__desc">
                {var_name}
            </div>
            <div>{key_words.join(" ")}</div>
        </div>
    )
}
