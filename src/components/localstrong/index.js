//设置项目
export function setItemLocal(key,value) {
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
export function delItemLocal(key) {
	let local = window.localStorage;
	local.removeItem(key);
	return true
}

//查询指定的项
export function getItemLocal(key) {
	let local = window.localStorage;
	return local.getItem(key)
}

//删除所有的localStorage
export function delAllItemLocal() {
	let local = window.localStorage;
	local.clear()
	return true
}

//设置项目
export function setItemSession(key,value) {
	let local = window.sessionStorage;
	if (typeof(value) == 'object') {
		let jsonStr = JSON.stringify(value)
		local.setItem(key, jsonStr);
	} else {
		local.setItem(key, value);
	}
	
	return true
}

//删除指定的项
export function delItemSession(key) {
	let local = window.sessionStorage;
	local.removeItem(key);
	return true
}

//查询指定的项
export function getItemSession(key) {
	let local = window.sessionStorage;
	return local.getItem(key)
}

//删除所有的sessionStorage
export function delAllItemSession() {
	let local = window.sessionStorage;
	local.clear()
	return true
}