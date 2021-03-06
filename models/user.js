var db = require('./db');

module.exports ={

	get: function(username, callback){
		var sql = "select * from user where username=?";
		db.getResults(sql, [username], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	gets: function(id, callback){
		var sql = "select * from user where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getproduct: function(id, callback){
		var sql = "select * from product where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	getAllemployee: function(callback){
		var sql = "select * from user where type='employee'";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	getAllproduct: function(callback){
		var sql = "select * from product";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	validate: function(user, callback){
		var sql = "select * from user where username=? and password=?";
		db.getResults(sql, [user.uname, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(user, callback){
		var sql = "insert into user values(?, ?, ?, ?, ?, ?)";

		db.execute(sql, ['', user.uname, user.password, user.type,user.gender,user.phone], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertproduct: function(user, callback){
		var sql = "insert into product values(?, ?, ?, ?)";

		db.execute(sql, ['', user.product_name, user.quantity, user.price], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
		var sql = "update user set username=?, password=?, type=?, gender=?, phone=? where id=?";
		db.execute(sql, [user.uname, user.password, user.type, user.gender, user.phone , user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateemp: function(user, callback){
		var sql = "update user set username=?, password=?, type=?, gender=?, phone=? where id=?";
		db.execute(sql, [user.uname, user.password, user.type, user.gender, user.phone , user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateproduct: function(user, callback){
		var sql = "update product set product_name=?, quantity=?, price=? where id=?";
		db.execute(sql, [user.product_name, user.quantity, user.price,  user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	deleteproduct: function(id, callback){
		var sql = "delete from product where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
