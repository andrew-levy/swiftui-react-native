import { useEffect } from 'react';

export function useOnAppear(perform: Function) {
	useEffect(() => perform(), []);
}
