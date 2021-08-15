import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Link,
    List,
    ListSubheader,
    Typography
} from "@material-ui/core";
import {ExpandMore} from "@material-ui/icons";
import React from "react";
import FetchStoryProvider from "../providers/FetchStoryProvider";
import {useSelector} from "react-redux";
import CommentListWithProvider from "./CommentListWithProvider";

export default function Bubble(props) {
    // noinspection JSCheckFunctionSignatures
    const displayedData = useSelector(state => state.defaultReducer.displayedData);
    const displayedRow = displayedData.find(row => row.id === props.id);

    if (displayedRow === undefined) {
        console.error(`Bubble data not found: ${props.id}`);
        return (<></>);
    }
    return (
        <FetchStoryProvider id={props.id}>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                >
                    {
                        displayedRow.loading ?
                            <CircularProgress/> :
                            <Typography variant="h5">
                                <Link href={displayedRow.data.url}>{displayedRow.data.title}</Link>
                            </Typography>
                    }
                </AccordionSummary>
                <AccordionDetails>
                    {!displayedRow.loading && displayedRow.data && displayedRow.data.kids &&
                            <List
                                aria-labelledby="comments"
                                subheader={<ListSubheader component="div"
                                                          id="nested-list-subheader">Comments</ListSubheader>}
                            >
                                <CommentListWithProvider loading={displayedRow.loading} comments={displayedRow.data.kids} />
                            </List>
                    }
                </AccordionDetails>
            </Accordion>
        </FetchStoryProvider>
    );
};
