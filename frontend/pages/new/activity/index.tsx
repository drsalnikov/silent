import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../../layout/Layout';
import { Activity, Reduction } from '../../../page-components';
import { IActivities, IActivity, IFactor, IFactorRisk, IFactorRisks, IFactors, IFactorsData } from '../../../interfaces/processes.interface';
import { API } from '../../../helpers/api';
import axios from 'axios';
import { useRouter } from 'next/router';

export const NewActivityPage = ({ dataFactors }: IFactorsData): JSX.Element => {

    return (
        <Activity data={dataFactors} />
    );
}

export default withLayout(NewActivityPage);

export const getStaticProps: GetStaticProps<IFactorsData> = async () => {

    const { data: dataFactors } = await axios.get<IFactor[]>(API.factor.get);

    if (!dataFactors) {
        return {
            notFound: true
        };
    }

    return {
        props: { dataFactors }
    };
};
