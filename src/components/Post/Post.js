import React from 'react'

export const Post = ({
    title,
    desc,
    image,
    date,
    creator,
    isActive
}) => {
    return (
        <div className="post">
            <span>{new Date(date).toLocaleDateString()}</span>
            <div>{creator}</div>
            <h2 className="post__header">{`Заголовок: ${title}`}</h2>
            <div className="post__image">
                <img src={image} className="post__image_img"/>
            </div>
            <div className="post__desc">
                <p className="post__desc_inner">
                    {desc}
                </p>
            </div>
        </div>
    )
}
