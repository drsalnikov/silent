import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../../layout/Layout';
import { ItprocEditForm } from '../../../page-components';
import { Htag, Card, P, Divider, Input, Button } from '../../../components';
import { API } from '../../../helpers/api';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import { IProc, IProcEdit } from '../../../interfaces/processes.interface';


const ItprocEdit = ({ itproc }: IProcEdit): JSX.Element => {

    return (
        <Card>
            <Htag tag='h1'>{"Изменить ИТ-процесс"}</Htag>
            <Divider />
            <ItprocEditForm
                ID={itproc?.ID}
                Name={itproc?.Name}
                RTO={itproc?.RTO}
                Level={itproc?.Level}
            />
        </Card>
    );
}

export default withLayout(ItprocEdit);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    const { data } = await axios.get<IProc[]>(API.itproc.get);

    data.map(i => {
        paths.push(`/edit/itproc/${i.ID}`);
    });

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<IProcEdit> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        };
    };

    const { data: dataProcess } = await axios.get<IProc[]>(API.itproc.id + params.id);

    const itproc = dataProcess[0];

    if (typeof itproc == 'undefined') {
        return {
            notFound: true
        };
    };

    return {
        props: { itproc },
        revalidate: Number(process.env.revalidate) || 30
    };
};
