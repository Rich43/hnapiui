import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {updateComment} from "../actions";

export default function FetchCommentProvider(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        for (const commentId of props.commentIds) {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`).then(request => {
                request.json().then(json => {
                    dispatch(updateComment(commentId, json));
                });
            });
        }
    }, [dispatch, props.commentIds]);
    return props.children;
}
