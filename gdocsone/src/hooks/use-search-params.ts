import {parseAsString, useQueryState} from "nuqs";
import { useState } from "react";


// to kind of explain how this works,
//! const [x, setX] = useState();
//! const [urlX, setUrlX] = useQueryState(); 
// it will auto synchronize with error values with URL search params
// so I would find ?urlX=123
// I dont want to use the usequery option every time so I mdae this hook

// If I set urlX(undefined), we dont want the URL to have null or undefined, that is what clear on default handles


export function useSearchParam() {
    return useQueryState(
        "search", parseAsString.withDefault("").withOptions({clearOnDefault: true})
    )
}