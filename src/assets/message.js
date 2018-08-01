exports.install = function (Vue, options) {
	Vue.prototype.msg_error = function (title, message) {
		this.$notify({
			title: title,
			message: message,
			type: 'error'
		});
	};
	Vue.prototype.msg_info = function (title, message) {
		this.$notify({
			title: title,
			message: message,
			type: 'info'
		});
	};
	Vue.prototype.msg_warning = function (title, message) {
		this.$notify({
			title: title,
			message: message,
			type: 'warning'
		});
	};
	Vue.prototype.msg_success = function (title, message) {
		this.$notify({
			title: title,
			message: message,
			type: 'success'
		});
	};
};