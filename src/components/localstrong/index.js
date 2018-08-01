//设置项目
export function setItem(key,value) {
	let local = window.localStorage;
	if (typeof(value) == 'object') {
		let jsonStr = JSON.stringify(value)
		local.setItem(key, jsonStr);
	} else {
		local.setItem(key, value);
	}
	
	return true
}

//删除指定的项
export function delItem(key) {
	let local = window.localStorage;
	local.removeItem(key);
	return true
}

//查询指定的项
export function getItem(key) {
	let local = window.localStorage;
	return local.getItem(key)
}

//删除所有的localStorage
export function delAllItem() {
	let local = window.localStorage;
	local.clear()
	return true
}