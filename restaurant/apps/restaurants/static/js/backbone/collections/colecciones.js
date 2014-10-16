var app = app || {};

var restaurants = Backbone.Collection.extend({
	model: app.restaurant,
	url: '/api/restaurants/'
});

app.restaurantsCollection = new restaurants();