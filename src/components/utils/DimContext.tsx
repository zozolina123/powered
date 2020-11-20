import React, { useEffect, useRef, useState } from 'react';

const ReactDims = React.createContext<DOMRect>({} as DOMRect);

interface Props {
    children: React.ReactElement<any>;
}

export const DimProvider = (props: Props): React.ReactElement => {
    const domNode = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({} as DOMRect);

    useEffect(() => {
        if (domNode && domNode.current) setDimensions(domNode.current.getBoundingClientRect());
    }, []);

    useEffect(() => {
        window.addEventListener('resize', getNodeDimensions);
        return () => {
            window.removeEventListener('resize', getNodeDimensions);
        };
    }, []);

    const getNodeDimensions = () => {
        if (domNode && domNode.current) setDimensions(domNode.current.getBoundingClientRect());
    };

    return (
        <div ref={domNode} style={{ height: '100%' }}>
            <ReactDims.Provider value={dimensions}>{props.children}</ReactDims.Provider>
        </div>
    );
};

export const withContext = (ChildComponent: (props: any) => React.ReactElement) => {
    return function WrappedWithDims(props: any): React.ReactElement<any> {
        return (
            <ReactDims.Consumer>
                {(incomingDims) => <ChildComponent {...props} dims={incomingDims} />}
            </ReactDims.Consumer>
        );
    };
};
