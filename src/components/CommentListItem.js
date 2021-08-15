import {CircularProgress, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import React from "react";
import {useSelector} from "react-redux";

export default function CommentListItem(props) {
    const loadedComments = useSelector(state => state.defaultReducer.comments);

    return (
        <ListItem button={props.button} onClick={props.onClick}>
            <ListItemAvatar><AccountCircle/></ListItemAvatar>
            {loadedComments.hasOwnProperty(props.row) ?
                <ListItemText primary={loadedComments[props.row].text}/> :
                <CircularProgress/>}
            {props.children}
        </ListItem>
    );
}
