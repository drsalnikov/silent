import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../../layout/Layout';
import { Activity, Reduction } from '../../../page-components';
import { IActivities, IActivity, IFactor, IFactorRisk, IFactorRisks, IFactors, IRisk } from '../../../interfaces/processes.interface';
import { API } from '../../../helpers/api';
import axios from 'axios';
import { useRouter } from 'next/router';

export const NewActivityPage = ({ data }: IFactors): JSX.Element => {

    return (
        <Activity data={data} />
    );
}

export default withLayout(NewActivityPage);

export const getStaticProps: GetStaticProps<IFactors> = async () => {

    const { data } = await axios.get<IFactor[]>(API.factor.get);

    if (!data) {
        return {
            notFound: true
        };
    }

    return {
        props: { data }
    };
};
