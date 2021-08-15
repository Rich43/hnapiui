import FetchTopStoriesProvider from "./providers/FetchTopStoriesProvider";
import {Grid,} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {display} from "./actions";
import {BubbleGrid} from "./components/BubbleGrid";

const BATCH_SIZE = 20;

function App() {
    // noinspection JSCheckFunctionSignatures
    const [bottomOfPage, setBottomOfPage] = useState(false);
    const displayedData = useSelector(state => state.defaultReducer.displayedData);
    const data = useSelector(state => state.defaultReducer.data);
    const dispatch = useDispatch();
    const ref = useRef();
    const displayedDataBuffer = [];

    for (let i = 0; i < displayedData.length; i++) {
        displayedDataBuffer.push(<BubbleGrid row={displayedData[i]} />);
    }

    useEffect(() => {
        window.addEventListener('scroll', event => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                dispatch(display(BATCH_SIZE));
                setBottomOfPage(false);
            }
        });
    }, [dispatch]);

    useEffect(() => {
        const clientRectHeight = ref.current && ref.current.getBoundingClientRect().height;
        const viewPortHeight = window.visualViewport.height + window.visualViewport.pageTop;
        if (clientRectHeight < viewPortHeight && !bottomOfPage && data.length > 0) {
            dispatch({type: 'display', count: BATCH_SIZE});
        } else if (ref.current && clientRectHeight >= viewPortHeight) {
            setBottomOfPage(true);
        }
    }, [bottomOfPage, data.length, dispatch, displayedData]);

    return (
        <div className="App">
            <Grid container justifyContent="center" spacing={2} padding={2} ref={ref}>
                <FetchTopStoriesProvider>
                    {displayedDataBuffer}
                </FetchTopStoriesProvider>
            </Grid>
        </div>
    );
}

export default App;
