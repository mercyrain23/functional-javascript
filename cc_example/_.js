function _filter(list, predi) {
	var new_list = [];
	_each(list, function (val) {
		if (predi(val)) new_list.push(val);
	});
	return new_list;
}

function _map(list, mapper) {
	var new_list = [];
	_each(list, function (val) {
		new_list.push(mapper(val));
	});
	return new_list;
}

// function _each(list, iter) {
// 	for (var i = 0; i < list.length; i++) {
// 		iter(list[i]);
// 	}
// 	return list;
// }

// function _curry(fn) {
// 	return function (a) {
// 		return function (b) {
// 			return fn(a, b);
// 		};
// 	};
// }

// prettier-ignore
function _curry(fn) {
	return function (a, b) {
		return arguments.length == 2 ? fn(a, b)	: function (b) { return fn(a, b); };
	};
}

var add = _curry(function (a, b) {
	return a + b;
});

var add10 = add(10);
console.log(add10(5));
console.log(add(5)(3));

// prettier-ignore
function _curryr(fn) {
	return function (a, b) {
		return arguments.length == 2 ? fn(a, b) : function (b) { return fn(b, a); };
	};
}

var sub = _curry(function (a, b) {
	return a - b;
});

var sub10 = sub(10);
console.log(sub10(5));
console.log(sub(5)(3));

var users = [
	{ name: 'AA', age: 10 },
	{ name: 'BB', age: 20 },
	{ name: 'CC', age: 30 },
	{ name: 'EE', age: 40 },
	{ name: 'FF', age: 50 },
];
// function _get(obj, key) {
// 	return obj == null ? undefined : obj[key];
// }
var _get = _curryr(function (obj, key) {
	return obj == null ? undefined : obj[key];
});
var user1 = users[0];
console.log(_get(user1, 'name'));
console.log(_get('name')(user1));

var get_name = _get('name');
console.log(get_name(user1));

console.log(
	_map(
		_filter(users, function (user) {
			return user.age >= 30;
		}),
		_get('age')
		// function (user) {
		// 	return user.age;
		// }
	)
);

console.log(
	_map(
		_filter(users, function (user) {
			return user.age < 30;
		}),
		_get('name')
	)
);

console.clear();

function _each(list, iter) {
	var _length = _get('length');
	for (var i = 0, len = _length(list); i < len; i++) {
		iter(list[i]);
	}
	return list;
}

// function _reduce(list, iter, memo) {
// 	_each(list, function (val) {
// 		memo = iter(memo, val);
// 	});
// 	return memo;
// }

var _map = _curryr(_map),
	_filter = _curryr(_filter);

var slice = Array.prototype.slice;
function _rest(list, num) {
	return slice.call(list, num || 1);
}
function _reduce(list, iter, memo) {
	if (arguments.length == 2) {
		memo = list[0];
		// list = list.slice(1); // array에서만 사용 가능
		list = _rest(list);
	}
	_each(list, function (val) {
		memo = iter(memo, val);
	});
	return memo;
}

console.log(_reduce([1, 2, 3, 4], add, 0));
console.log(_reduce([1, 2, 3, 4], add));

console.clear();

function _pipe() {
	var fns = arguments;
	return function (arg) {
		return _reduce(
			fns,
			function (arg, fn) {
				return fn(arg);
			},
			arg
		);
	};
}

var f1 = _pipe(
	function (a) {
		return a + 1;
	},
	function (a) {
		return a * 2;
	},
	function (a) {
		return a + a;
	}
);

console.log(f1(1));

function _go(arg) {
	var fns = _rest(arguments);
	return _pipe.apply(null, fns)(arg);
}

_go(
	1,
	function (a) {
		return a + 1;
	},
	function (a) {
		return a * 2;
	},
	function (a) {
		return a + a;
	},
	console.log
);

_each(null, console.log);


