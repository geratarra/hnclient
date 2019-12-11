import React from 'react';
import PropTypes from 'prop-types';

const arrowStyle = {
    backgroundImage: "url(https://news.ycombinator.com/grayarrow2x.gif)",
    backgroundSize: "13px",
    height: "13px",
    width: "13px",
    backgroundRepeat: "no-repeat",
    display: "inline-block"
};

const Comments = (props) => {
    const item = props.item;
    const renderComments = function (comments) {
        return comments.map(comment => {
            return (
                <div className="ml-6 mt-4" key={comment.id}>
                    <p>
                        <span><span style={arrowStyle} className="text-xl"></span>&nbsp;&nbsp;{comment.user} </span>
                        <span className="text-gray-600">{comment.time_ago}</span>
                    </p>
                    <p dangerouslySetInnerHTML={{__html: comment.content}}></p>
                    {renderComments(comment.comments)}
                </div>
            );
        });
    };

    return (
        <div>
            <p className="text-2xl text-gray-800 tracking-wide">
                {item.title}
            </p>
            <p className="text-base text-gray-700 pb-3">
                <span>{item.points} points</span>&nbsp;
                <span>by {item.user}</span>&nbsp;
                <span>{item.time_ago}</span>&nbsp;
                |&nbsp;{item.comments_count ? item.comments_count + ' comments' : <span>0 comments</span>}
            </p>
            {renderComments(item.comments)}
        </div>

    );
};

Comments.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    points: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]),
    user: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    time: PropTypes.number,
    time_ago: PropTypes.string,
    content: PropTypes.string,
    deleted: PropTypes.bool,
    dead: PropTypes.bool,
    type: PropTypes.string,
    url: PropTypes.string,
    domain: PropTypes.string,
    comments: PropTypes.arrayOf(Comments),
    level: PropTypes.number,
    comments_count: PropTypes.number
};

export default Comments;
