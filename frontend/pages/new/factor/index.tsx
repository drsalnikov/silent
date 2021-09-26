import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../../layout/Layout';
import { Factor } from '../../../page-components';
import { IFactor, IFactorRisk, IFactors, IRisk } from '../../../interfaces/processes.interface';
import { API } from '../../../helpers/api';
import axios from 'axios';
import { useRouter } from 'next/router';

export const NewFactorPage = (): JSX.Element => {

    return (
        <Factor />
    );
}

export default withLayout(NewFactorPage);

