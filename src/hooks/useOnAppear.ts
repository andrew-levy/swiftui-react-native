import { useEffect } from 'react';

export function useOnAppear(perfrom: Function) {
	useEffect(() => perfrom(), []);
}
