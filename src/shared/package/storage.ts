class StorageService {
	setItem(key: string, value: string) {
		if (window) {
			localStorage.setItem(key, value)
		}
	}

	removeItem(key: string) {
		if (window) {
			localStorage.removeItem(key)
		}
	}

	getItem(key: string) {
		if (window) {
			localStorage.getItem(key)
		}
	}
}

export const storageService = new StorageService()
