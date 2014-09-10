var app = app || {};

app.restaurant = Backbone.Model.extend({
	urlRoot: 'api/restaurants/'
});

app.restaurantCiudad = Backbone.Model.extend({
});

app.restaurantCategoria = Backbone.Model.extend({
});

app.restaurantPago = Backbone.Model.extend({
});