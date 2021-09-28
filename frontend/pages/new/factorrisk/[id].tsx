import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../../layout/Layout';
import { FactorRisk } from '../../../page-components';
import { IFactor, IFactorRisk, IFactors, IRisk } from '../../../interfaces/processes.interface';
import { API } from '../../../helpers/api';
import axios from 'axios';
import { useRouter } from 'next/router';

export default withLayout(FactorRisk);

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

export const getStaticProps: GetStaticProps<IFactors> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        };
    };

    const { data: dataFactors } = await axios.get<IFactor[]>(API.factor.get);
    const { data: dataRisks } = await axios.get<IRisk[]>(API.risk.id + params.id);
    const risk = dataRisks[0];

    if (!dataFactors) {
        return {
            notFound: true
        };
    }

    if (!risk) {
        return {
            notFound: true
        };
    }

    return {
        props: { risk, dataFactors }
    };
};

