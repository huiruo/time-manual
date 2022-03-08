const storageBroswer = window.sessionStorage;

const getItem = (key: string) => {
	const item: string | null = storageBroswer.getItem(key);
	try {
		return item && JSON.parse(item);
	} catch (e) {
		return item;
	}
};

const setItem = (key: string, data: any) => {
	if (typeof data === 'object') {
		storageBroswer.setItem(key, JSON.stringify(data));
	}
};

const clearStorage = () => storageBroswer.clear();

const removeItem = (key: string) => {
	storageBroswer.removeItem(key);
};

export const sessionStorage = {
	getItem,
	setItem,
	clearStorage,
	removeItem
};
