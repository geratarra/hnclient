import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";

const List = props => {
    const MoreLink = (moreLinkProps) => {
        const handleMoreClick = (e) => {
            props.triggerMoreClick();
        };

        return (
            <span onClick={handleMoreClick}>
                <Link to={'/news?p=' + (props.currentPage ? props.currentPage + 1 : 2)}>More</Link>
            </span>
        )
    };

    return (
        <section className='section'>
            {props.news && props.news.map((item, i) =>
                <div key={item.id} className="pb-2">
                    <a href={item.url} target='blank' className="md:text-xl lg:text-2xl text-gray-800 tracking-wide">
                        <span className="text-gray-600 md:text-base lg:text-xl">{(props.currentPage*30 - 29 + i) + '.'} &nbsp;&nbsp;</span>
                        {item.title}
                    </a>
                    <p className="text-base text-gray-700">
                        <span>{item.points} points</span>&nbsp;
                        <span>by {item.user}</span>&nbsp;
                        <span>{item.time_ago}</span>&nbsp;
                        |&nbsp;{item.comments_count ? <Link to={'/' + item.id}>{item.comments_count} comments</Link> : <span>0 comments</span>}
                    </p>
                </div>
            )}
            <MoreLink />
        </section>
    );
};

List.propTypes = {
    news: PropTypes.array
};

export default List;