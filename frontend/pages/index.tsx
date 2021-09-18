import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home(): JSX.Element {
	/*
		const [rating, setRating] = useState<number>(4);
		
				<Htag tag='h1'>Заголовок</Htag>
				<Button appearance='primary' arrow='right'>Кнопка</Button>
				<Button appearance='ghost' arrow='down'>Кнопка</Button>
				<P size='l'>Большой</P>
				<P>Средний</P>
				<P size='s'>Маленький</P>
				<Tag size='s'>Ghost</Tag>
				<Tag size='m' color='red'>Red</Tag>
				<Tag size='s' color='green'>Green</Tag>
				<Tag color='primary'>Green</Tag>
				<Rating rating={rating} isEditable setRating={setRating} />
				<Input placeholder='тест' />
				<Textarea placeholder='тест area' />
	*/
	return (
		<>
			стартовая страница
		</>
	);
}

export default withLayout(Home);
