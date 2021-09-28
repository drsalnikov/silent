import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../../layout/Layout';
import { FactorRiskForm, Htag, Divider, Card } from '../../../components';
import { IFactor, IFactorRisk, IFactors, IRisk, IFactorRiskEdit } from '../../../interfaces/processes.interface';
import { API } from '../../../helpers/api';
import axios from 'axios';
import { useRouter } from 'next/router';

export const FactorRiskEdit = ({ factorrisk, dataFactors }: IFactorRiskEdit): JSX.Element => {

    return (
        <Card>
            <Htag tag='h1'>{"Изменить фактор риска"}</Htag>
            <Divider />
            <FactorRiskForm
                dataFactors={dataFactors}
                ID={factorrisk?.ID}
                CFACTOR={factorrisk?.CFACTOR}
                CRISK={factorrisk?.CRISK}
                Set={factorrisk?.Set}
                Percent={factorrisk?.Percent}
                isNew={false}
            />
        </Card>
    );
}

export default withLayout(FactorRiskEdit);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    const { data } = await axios.get<IFactorRisk[]>(API.factorRisk.get);

    data?.map(i => {
        paths.push(`/edit/factorrisk/${i.ID}`);
    });

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<IFactorRiskEdit> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        };
    };

    const { data: dataFactors } = await axios.get<IFactor[]>(API.factor.get);
    const { data: dataFactorRisk } = await axios.get<IFactorRisk[]>(API.factorRisk.id + params?.id);
    const factorrisk = dataFactorRisk[0];

    if (!factorrisk) {
        return {
            notFound: true
        };
    };

    if (!dataFactors) {
        return {
            notFound: true
        };
    }

    return {
        props: { factorrisk, dataFactors },
        revalidate: Number(process.env.revalidate) || 30
    };
};

