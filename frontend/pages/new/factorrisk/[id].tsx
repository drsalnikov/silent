import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../../layout/Layout';
import { FactorRisk } from '../../../page-components';
import { IFactor, IFactorRisk, IFactors, IRisk } from '../../../interfaces/processes.interface';
import { API } from '../../../helpers/api';
import axios from 'axios';
import { useRouter } from 'next/router';

export const NewFactorRiskPage = ({ data }: IFactors): JSX.Element => {

    return (
        <FactorRisk data={data} />
    );
}

export default withLayout(NewFactorRiskPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    const { data } = await axios.get<IRisk[]>(API.risk.get);

    data.map(i => {
        paths.push(`/new/factorrisk/${i.ID}`);
    });

    return {
        paths,
        fallback: true
    };
};

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

