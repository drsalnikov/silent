import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../../layout/Layout';
import { Risk } from '../../../page-components';
import { API } from '../../../helpers/api';
import axios from 'axios';


export default withLayout(Risk);