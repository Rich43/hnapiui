import React, {useState} from "react";
import {Box, Collapse} from "@material-ui/core";
import CommentListItem from "./CommentListItem";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {useSelector} from "react-redux";
import CommentListWithProvider from "./CommentListWithProvider";

export default function CollapsableCommentList(props) {
    const [open, setOpen] = useState(false);
    const loadedComments = useSelector(state => state.defaultReducer.comments);
    const childComments = loadedComments.hasOwnProperty(props.row) && loadedComments[props.row].kids;
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <CommentListItem loadedComments={loadedComments} row={props.row} onClick={handleClick} button>
                {open ? <ExpandLess /> : <ExpandMore />}
            </CommentListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {childComments ?
                    <Box pl={4}><CommentListWithProvider loading={loadedComments[props.row].loading} comments={childComments} /></Box> :
                    <></>
                }
            </Collapse>
        </>
    );
}
