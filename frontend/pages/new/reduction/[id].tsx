import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../../layout/Layout';
import { Reduction } from '../../../page-components';
import { IActivities, IActivity, IFactor, IFactorRisk, IFactorRisks, IFactors, IRisk } from '../../../interfaces/processes.interface';
import { API } from '../../../helpers/api';
import axios from 'axios';
import { useRouter } from 'next/router';

export const NewReductionPage = ({ data }: IActivities): JSX.Element => {

    const router = useRouter();
    const { id } = router.query;

    return (
        <Reduction data={data} />
    );
}

export default withLayout(NewReductionPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    const { data } = await axios.get<IFactorRisk[]>(API.factorRisk.get);

    data.map(i => {
        paths.push(`/new/reduction/${i.ID}`);
    });

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<IActivities> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        };
    };

    const { data: factorrisk } = await axios.get<IFactorRisk[]>(API.factorRisk.id + params.id);
    const frisk: IFactorRisk | undefined = factorrisk.shift();

    const { data } = await axios.get<IActivity[]>(API.activity.byFactor + frisk?.CFACTOR);

    if (!data) {
        return {
            notFound: true
        };
    }

    return {
        props: { data }
    };
};
