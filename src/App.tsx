import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';

export default function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>			
			<Outlet />
		</MantineProvider>
	);
}


