import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { Category } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'itprocesses', name: 'ИТ-процессы', icon: <CoursesIcon />, id: Category.Itproc },
	{ route: 'factor', name: 'Факторы', icon: <ServicesIcon />, id: Category.Factor },
	{ route: 'activity', name: 'Мероприятия', icon: <BooksIcon />, id: Category.Activity },
	{ route: 'result', name: 'Расчет', icon: <ProductsIcon />, id: Category.Result }
];

export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

export const declOfNum = (number: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2]
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};