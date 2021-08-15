import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {bulkInsertId} from "../actions";

export default function FetchTopStoriesProvider(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty').then(request => {
            request.json().then(json => {
                dispatch(bulkInsertId(json));
            });
        });
    }, [dispatch]);
    return props.children;
}
