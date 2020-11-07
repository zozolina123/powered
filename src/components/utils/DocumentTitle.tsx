import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

interface Props {
    title: string;
}

export default function DocumentTitle({ title }: Props): React.ReactElement {
    return (
        <FormattedMessage id={title}>
            {(title) => (
                <Helmet>
                    <title>{title}</title>
                </Helmet>
            )}
        </FormattedMessage>
    );
}
