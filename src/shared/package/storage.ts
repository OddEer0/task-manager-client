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

	getItem<T>(key: string) {
		if (window) {
			localStorage.getItem<T>(key)
		}
	}
}

export const storageService = new StorageService()
