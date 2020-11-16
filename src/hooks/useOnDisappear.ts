import { useEffect } from 'react';

export function useOnAppear(perform: () => void) {
	useEffect(() => perform, []);
}
