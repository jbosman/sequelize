var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
// , {
//     logging: false
// });


var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
	allowNull: false,
	defaultValue: "Title"
    },
    urlTitle: {
        type: Sequelize.STRING,
	allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
	allowNull: false,
	defaultValue: "Content"
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
},
		     {
			 getterMethods: {
				page: function() {
				    return {
					title: this.title,
					url: '/wiki/' + this.urlTitle,
					content: this.content,
					status: this.status
				    };
				}
			    }

});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
	allowNull: false,
	defaultValue: "User"
    },
    email: {
        type: Sequelize.STRING,
	allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};
