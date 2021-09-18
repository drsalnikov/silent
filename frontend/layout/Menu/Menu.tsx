import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent, useState } from 'react';
//import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	//const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const shouldReduceMotion = useReducedMotion();
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0 }
	};

	// {m.id == firstCategory && buildSecondLevel(m)}
	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					<li key={m.route} >
						<Link href={`/${m.route}`}>
							<a>
								<div className={cn(styles.firstLevel)}>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
					</li>
				))}
			</ul>
		);
	};

	return (
		<nav className={styles.menu} role='navigation'>
			{buildFirstLevel()}
		</nav>
	);
};