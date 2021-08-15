import {Grid, makeStyles} from "@material-ui/core";
import Bubble from "./Bubble";
import React from "react";

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
}));

export function BubbleGrid(props) {
    const row = props.row;
    const classes = useStyles();
    return (
        <Grid key={`grid-${row.index}`} item xs={12} className={classes.padding}>
            <Bubble key={`bubble-${row.index}`} id={row.id} />
        </Grid>
    );
}
