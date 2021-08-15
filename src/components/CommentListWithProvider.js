import React from "react";
import FetchCommentProvider from "../providers/FetchCommentProvider";
import CommentListItem from "./CommentListItem";
import {useSelector} from "react-redux";
import CollapsableCommentListItem from "./CollapsableCommentList";

export default function CommentListWithProvider(props) {
    const loadedComments = useSelector(state => state.defaultReducer.comments);
    const commentBuffer = [];
    if (!props.loading && props.comments) {
        props.comments.forEach(row => {
            const hasProperty = loadedComments.hasOwnProperty(row);
            const childComments = hasProperty && loadedComments[row].kids;
            const hasComment = childComments && childComments.length > 0;
            commentBuffer.push(hasComment ?
                    <CollapsableCommentListItem loadedComments={loadedComments} row={row} /> :
                    <CommentListItem loadedComments={loadedComments} row={row}>
                        {props.children}
                    </CommentListItem>
            );
        });
    }
    return (
        <FetchCommentProvider commentIds={props.comments}>
            { commentBuffer }
        </FetchCommentProvider>
    );
}
