import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import queryString from 'query-string'

import "./App.css";
import "./output.css";

import { API_URI } from "./config";
import List from './components/list/List';
import Header from './components/header/Header';
import Comments from './components/comments/Comments';

const axios = require("axios");

let currentPage,
    previousPage,
    previousItemId;

function App() {
    const [news, setNews] = useState(undefined);
    const [comments, setComments] = useState(undefined);

    const getNews = (url) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    setNews(response.data);
                } else {
                    setNews(null);
                }
            })
            .catch(error => {
                setNews(null);
            });
    };

    const getComments = (url) => {
        axios
            .get(url)
            .then(response => {
                if (response && response.status === 200) {
                    setComments(response.data);
                } else {
                    setComments(null);
                }
            })
            .catch(error => {
                setComments(null);
            });
    };

    const triggerMoreClick = () => {
        setNews(undefined);
    };

    const handlePathMatch = (props) => {
        const queryStrings = queryString.parse(props.location.search);
        const _currentPage = Number(queryStrings.p);

        if (_currentPage !== previousPage) {
            previousPage = _currentPage;
            currentPage = _currentPage;
            setNews(undefined);
            getNews(API_URI + 'news/' + _currentPage + '.json');
        }

        if (news === undefined) {
            return <div><p>Loading...</p></div>
        } else if (news === null) {
            return <div><p>Error!</p></div>
        } else {
            return <List triggerMoreClick={triggerMoreClick} currentPage={currentPage} news={news}></List>
        }
    };

    const handleCommentsClick = (props) => {
        const id = props.location.pathname.slice(1);
        if (id !== previousItemId) {
            previousItemId = id;
            setComments(undefined);
            getComments(API_URI + 'item/' + id + '.json');
        }
        

        if (comments === undefined) {
            return <div><p>Loading...</p></div>
        } else if (comments === null) {
            return <div><p>Error!</p></div>
        } else {
            return <Comments item={comments}></Comments>
        }
    };


    return (
        <React.Fragment>
            <header className='container mx-auto px-4 py-8'>
                <Header></Header>
            </header>
            <main className='container mx-auto px-4 pb-4'>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/news?p=1" />
                        </Route>
                        <Route path='/news' render={(props) => handlePathMatch(props)} />
                        <Route path='/:id' render={(props) => handleCommentsClick(props)}></Route>
                    </Switch>
                </Router>
            </main>
        </React.Fragment>
    );
}

export default App;
