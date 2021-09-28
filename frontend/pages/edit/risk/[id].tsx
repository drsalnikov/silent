import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { withLayout } from '../../../layout/Layout';
import { Risk } from '../../../page-components';
import { API } from '../../../helpers/api';
import { RiskForm, Htag, Card, P, Divider } from '../../../components';
import { IProc, IProcesses, IRisk, IRiskEdit } from '../../../interfaces/processes.interface';
import axios from 'axios';

export const EditRisk = ({ risk }: IRiskEdit): JSX.Element => {

    return (
        <Card>
            <Htag tag='h1'>{"Изменить риск по ИТ-Процессу"}</Htag>
            <Divider />
            <RiskForm
                ID={risk?.ID}
                CITPROC={risk?.CITPROC}
                Name={risk?.Name}
                Damage={risk?.Damage}
                isNew={false}
            />
        </Card>
    );
}

export default withLayout(EditRisk);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    const { data } = await axios.get<IProc[]>(API.risk.get);

    data.map(i => {
        paths.push(`/edit/risk/${i.ID}`);
    });

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<IRiskEdit> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        };
    };

    const { data: dataRisk } = await axios.get<IRisk[]>(API.risk.id + params.id);
    const risk = dataRisk[0];

    if (!risk) {
        return {
            notFound: true
        };
    };

    return {
        props: { risk }
    };
};
