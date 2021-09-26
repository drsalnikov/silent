import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Button, Htag, Input, P, Rating, Tag, Textarea, Card, Divider } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home(): JSX.Element {

	return (
		<Card>
			<Htag tag='h1'>Команда Молчуны</Htag>
			<Divider />
			<P size='l'>Интерфейс программы предназначен для внесения в систему дерева отказов для последующего анализа и выбора оптимального набора мероприятий для снижения рисков.</P>
		</Card>
	);
}

export default withLayout(Home);
