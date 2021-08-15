import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {updateDisplayedData} from "../actions";

export default function FetchStoryProvider(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`).then(request => {
            request.json().then(json => {
                dispatch(updateDisplayedData(props.id, json));
            });
        });
    }, [dispatch, props.id]);
    return props.children;
}
